import React, {useState} from 'react';
import Modal from "Components/Content/Modal";
import Button from "Components/Content/Button";
import DashboadOrderDetail from 'Containers/DashboardOrderDetail';

const DashboardTicketDetail = () => {
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
    return(
        <>
            <DashboadOrderDetail actionComponent={actionComponent} />
            {modal && (
                <Modal cancelCallBack ={() => setModal(!modal)} confirmCallBack = {confirmCallBack} />   
            )}
        </>
    )
}

export default DashboardTicketDetail;