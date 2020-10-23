import React, {useState,useEffect} from 'react';
import Modal from "Components/Content/Modal";
import Button from "Components/Content/Button";
import DashboadOrderDetail from 'Containers/DashboardOrderDetail';
import Table from "Components/Table/Detail/Table";
import Api from "Helpers/api";
import useStores from 'Helpers/useStores';
import image from "Images/example_product.png"; //remove this later
import { set } from 'js-cookie';

const api = new Api();

const DashboardFacilityOrderDetail = (props) => {
    const { store } = useStores();
    const { match } = props;
    const OrderId = parseInt(match.params.id);
    // ======================== Ticket Data ========================
    const [ticketData , setTicketData ] = useState(null);
    const [ticketDataRaw , setTicketRaw ] = useState(null);
    const [ticketHeader , setTicketHeader] = useState(); 
    const userData = JSON.parse(localStorage.getItem('user'));
    const supplierId = userData.user_profile.supplier;
    const getData = async () => await api.getSupplierTicketOrder(1,1)
    .then((response) => {
        // need ticket facility and info
        console.log(response.data);
        setTicketHeader ({
            order_number: response.data.ticket_no,
            order_date: response.data.ticket_date,
            facility: ("Royal Alex") ,
            unit: "Emergency",
            shipping_address:"1234 Street NW"
        }) 
        console.log(response.data);
        let arr = response.data.order.order_products;
        setTicketRaw(response.data)
        arr = arr.map(item => {
            let obj = {
                product_image: item.product_option.product_image,
                item: item.order,  
                ...item.product_option,
                priority: 1,
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
            text={"Draft"} 
            color={"status-grey"} 
            text_size="text-sm" 
            pill={true}
            extraClasses={ "text-status-dark-red border-4 border-white hover:status-red" }
        />
    ;
    const confirmCallBack = () => {
        let arr = ticketDataRaw;
        arr.status = "shipped";
        let obj = {
            "status":"shipped"
        }
        api.setUpdateTicket(supplierId,ticketDataRaw.pk,obj).then((response)=>{
            getData();
            setModal(!modal);
        }).catch(error => {
            console.error('Error', error);
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
                        <Modal  cancelCallBack ={() => setModal(!modal)} confirmCallBack = {confirmCallBack} buttonText="Mark as Shipped">
                            <div className="px-6 py-4 border-b border-gray-300">
                                <h2 className="text-betterfit-navy text-xl">Mark Order As Shipped</h2>
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

export default DashboardFacilityOrderDetail;