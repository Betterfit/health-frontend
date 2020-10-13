import React from "react";
import OrderHeader from 'Components/Order/OrderHeader'
import BackNavigation from 'Components/Helpers/BackNavigation'
// const DashboardOrders = ({changeTitle}) =>{
//     changeTitle('Orders');
//     return(
//         <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
//           {/* <h1>Orders!!!!</h1>   */}
//         </div>
//     )
// }
const DashboardOrders = ({ changeTitle }) => {
    //TODO For testing and developing only
  const Info = {
    facility: "Royal Alexandra",
    unit: "Emergency",
  };
  const dummmydata = {
    order_number: "123124124",
    order_date: "Sept 01, 2020",
    is_draft: true,
  };
  changeTitle("Orders");
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
      <OrderHeader facility={Info} />
    </div>
      
    
  );
};

export default DashboardOrders;
