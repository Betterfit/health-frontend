import React, {useState,useEffect} from 'react';
import Modal from "Components/Content/Modal";
import Button from "Components/Content/Button";
import DashboadOrderDetail from 'Containers/DashboardOrderDetail';
import Table from "Components/Table/Detail/Table";
import Api from "Helpers/api";
import image from "Images/example_product.png"; //remove this later
import { set } from 'js-cookie';

const api = new Api();

const DashboardTicketDetail = (props) => {
    const { match } = props;
    const TicketId = parseInt(match.params.id);
    // ======================== Ticket Data ========================
    const [ticketData , setTicketData ] = useState(null);
    const [ticketDataRaw , setTicketRaw ] = useState(null);
    const [ticketHeader , setTicketHeader] = useState(); 
    const getData = async () => await api.getSupplierTicketOrder(TicketId)
    .then((response) => {
        // need ticket facility and info
        setTicketHeader ({
            order_number: response.data.ticket_no,
            order_date: response.data.ticket_date,
            facility: ("Royal Alex") ,
            unit: "Emergency",
            shipping_address:"1234 Street NW"
        }) 
        let arr = response.data.order.order_products;
        setTicketRaw(response.data)
        arr = arr.map(item => {
            let obj = {
                product_image: item.product_option.product_image,
                item: item.order,  
                ...item.product_option,
                priortity: 1,
            };
            return obj;
        });
        console.log(arr);
        setTicketData(arr);
    })
    .catch((err) => console.log(err));
    useEffect(() => {
        getData();
    }, []);
    // ======================== End Ticket Data ========================


    const [modal , setModal ] = useState(false);

    const actionComponent = 
        <Button 
            text={"Mark as Shipped"} 
            color='status-dark-green' 
            text_size="text-sm" 
            onClick={() => setModal(!modal)}
        />
    ;
    const confirmCallBack = () => {
        let arr = ticketDataRaw;
        arr.status = "shipped";
        api.setUpdateOrder(ticketDataRaw.pk,arr).then((response)=>{
            getData();
            setModal(!modal);
        });
    }

    const excludeKeys = ["pk","product_image"];
    const excludeValues = ["pk"];


    return(
        <>
        {ticketData && (
            <>
                <DashboadOrderDetail actionComponent={actionComponent} headerData={ticketHeader} >
                 
                    <Table TableData={ticketData} excludeKeys={excludeKeys} excludeValues={excludeValues} />
                
                </DashboadOrderDetail> 
                <>
                    {modal && (
                        <Modal  cancelCallBack ={() => setModal(!modal)} confirmCallBack = {confirmCallBack}>
                            <div className="px-6 py-4 border-b border-gray-300">
                                <h2 class="text-betterfit-navy text-xl">Mark Order As Shipped</h2>
                            </div>
                            <div className="py-6 px-6">
                                <p className="text-paragraph text-base">Are you sure you’re ready to mark this order as shipped and close the ticket? </p>
                            </div>
                        </Modal> 
                    
                    )}
                </> 
            </>
        )}
        </>
        
    )
}

export default DashboardTicketDetail;