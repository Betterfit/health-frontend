import React, {useState} from 'react';
import Modal from "Components/Content/Modal";
import Button from "Components/Content/Button";
import DashboadOrderDetail from 'Containers/DashboardOrderDetail';
import Table from "Components/Table/Detail/Table";
import Api from "Helpers/api";
import image from "Images/example_product.png"; //remove this later

const api = new Api();

const DashboardTicketDetail = () => {
    // const [ProductData , setProductData] = useState(null);
    // const getData = async () => await api.getProduct(1)
    // .then((response) => {
    //     setProductData(response.data)
    // })
    // .catch((err) => console.log(err));
    // if(!ProductData){
    //     getData();
    // }

    // console.log(ProductData);


    const ProductData = [
        { 
            "image": image,
            "item": "DW5",
            "size": "1000ml",
            "quantity": 244,
            "priortity": "stat",
            "pk":234
        },
        { 
            "image": image,
            "item": "DW5",
            "size": "1000ml",
            "quantity": 244,
            "priortity": "stat",
            "pk":234
        }
    ]


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
        setModal(!modal);
    }

    const excludeKeys = ["pk","image"];
    const excludeValues = ["pk"];

    return(
        <>
            <DashboadOrderDetail actionComponent={actionComponent} >
                {ProductData && (
                    <Table TableData={ProductData} excludeKeys={excludeKeys} excludeValues={excludeValues} />
                )}
            </DashboadOrderDetail>   
            {modal && (
                <Modal  cancelCallBack ={() => setModal(!modal)} confirmCallBack = {confirmCallBack} />   
            )}
        </>
    )
}

export default DashboardTicketDetail;