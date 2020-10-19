import React, {useState, useEffect} from "react";
import Tabs from 'Components/Tabs/Tabs';
import TicketSearch from 'Components/Search/TicketSearch';
import Table from 'Components/Table/List/Table';
import Api from "Helpers/api";
// import OrderHeader from 'Components/Order/OrderHeader'
// import BackNavigation from 'Components/Helpers/BackNavigation'

const api = new Api();
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
  const [ticketData , setTickData ] = useState(null);
  const [openTickets, setOpenTickets] = useState(null);
  const [shippedTickets, setShippedTickets] = useState(null);
  const getData = async () => await api.getSupplierTickets()
  .then((response) => {
      let data = response.data;
      let open = data.filter( item => {
        if(item.status == "open"){
          let filterItem = item;
          let filterItemStatus = filterItem.status; //save status to re-sort

          filterItem.facility = item.supplier.name;
          
          delete filterItem.supplier; 
          delete filterItem.order; 
          delete filterItem.status;

          filterItem.status = filterItemStatus;// set status
          
          return(
            filterItem
          )
        }
      });
      let ship = data.filter( item => {
        if(item.status == "shipped"){
          let filterItem = item;
          let filterItemStatus = filterItem.status;//save status to re-sort

          filterItem.facility = item.supplier.name;
          
          delete filterItem.supplier; 
          delete filterItem.order; 
          
          filterItem.status = filterItemStatus;// set status

          return(
            filterItem
          )
        }
      });
      setTickData(response.data);
      setOpenTickets(open);
      setShippedTickets(ship);
    })
  .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);
  

  const TabData = [ 
    {
        heading:'Open',
        content: openTickets ? <Table TableData={openTickets} link={'/dashboard/tickets/'} /> : <div>No Tickets</div> ,
        key:'opened'
    },
    {
        heading:'Shipped',
        content: shippedTickets ? <Table TableData={shippedTickets} link={'/dashboard/tickets/'} /> : <div>No Tickets</div>,
        key:'shipped'
    }
  ]
  

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
      <h2 className="text-3xl text-dark-blue my-3">Tickets</h2>
      {ticketData && (
        <Tabs tabs={TabData} amount={true} headingComp={<TicketSearch callBack={(e) => setSearchActive(e)} searchActive={searchActive} />} />
      )}
    </div>  
      
  );
};

export default DashboardTickets;
