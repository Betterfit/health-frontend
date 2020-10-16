import React, {useState} from "react";
import Tabs from 'Components/Tabs/Tabs';
import TicketSearch from 'Components/Search/TicketSearch';
import Table from 'Components/Table/List/Table';
// import OrderHeader from 'Components/Order/OrderHeader'
// import BackNavigation from 'Components/Helpers/BackNavigation'


const DashboardTickets = () => {
    //TODO For testing and developing only
  // const Info = {
  //   facility: "Royal Alexandra",
  //   unit: "Emergency",
  // };
  // const dummmydata = {
  //   order_number: "123124124",
  //   order_date: "Sept 01, 2020",
  //   is_draft: true,
  // };

  const [searchActive , setSearchActive] = useState(false);

  const tableData = [
    {
      ticket: "1001-2020-001240",
      facility: "Royal Alexandra Ho...",
      order_date : "Sept 18, 2020",
      status: "open",
      id:1232
    },
    {
      ticket: "1001-2020-001240",
      facility: "Royal Alexandra Ho...",
      order_date : "Sept 18, 2020",
      status: "open",
      id:1232
    }
];

const tableData2 = [
  {
    ticket: "1001-2020-001240",
    facility: "Royal Alexandra Ho...",
    order_date : "Sept 18, 2020",
    status: "shipped",
    id:1232
  },
  {
    ticket: "1001-2020-001240",
    facility: "Royal Alexandra Ho...",
    order_date : "Sept 18, 2020",
    status: "shipped",
    id:1232
  }
];
    
  

  const TabData = [ 
    {
        heading:'Open',
        content: <Table TableData={tableData} link={'/dashboard/tickets/'} /> ,
        key:'opened'
    },
    {
        heading:'Shipped',
        content:<Table TableData={tableData2} link={'/dashboard/tickets/'} />,
        key:'shipped'
    }
  ]
  

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
      <h2 className="text-3xl text-dark-blue my-3">Tickets</h2>
      <Tabs tabs={TabData} amount={true} headingComp={<TicketSearch callBack={(e) => setSearchActive(e)} searchActive={searchActive} />} />
    </div>  
      
  );
};

export default DashboardTickets;
