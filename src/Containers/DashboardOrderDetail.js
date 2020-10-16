import React , {useState} from 'react';
import OrderDetailHeader from 'Components/Order/OrderDetailHeader';
import Api from "Helpers/api";
const api = new Api();

//TODO For testing and developing only
const dummmydata = {
  order_number: "123124124",
  order_date: "Sept 01, 2020",
  is_draft: true,
};

const DashboadOrderDetail = ({children,actionComponent}) => {
    return(
        <div className="w-full py-4 pt-6 px-4 sm:px-6 md:px-8">
            <OrderDetailHeader order={dummmydata} actionComponent={actionComponent} />
            {children}
        </div>
    )
}


export default DashboadOrderDetail;