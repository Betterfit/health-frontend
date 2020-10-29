import React, {useState, useEffect} from "react";
import Tabs from 'Components/Tabs/Tabs';
import TicketSearch from 'Components/Search/TicketSearch';
import Table from 'Components/Table/List/Table';
import Api from "Helpers/api";
import {useAuthStore} from "Context/authContext";
// import OrderHeader from 'Components/Order/OrderHeader'
// import BackNavigation from 'Components/Helpers/BackNavigation'

const api = new Api();
const DashboardTickets = () => {
  const authStore = useAuthStore();
  const [searchActive , setSearchActive] = useState(false);
  const [ticketData , setTickData ] = useState(null);
  const [openTickets, setOpenTickets] = useState(null);
  const [shippedTickets, setShippedTickets] = useState(null);
  const userData = JSON.parse(authStore.user);
  const supplierId = userData.user_profile.supplier;
  let [openCount , setOpen] = useState(0);
  let [closedCount , setClosed] = useState(0);
  const getData = async () => await api.getSupplierTickets(supplierId)
  .then((response) => {
      let data = response.data;
      let open = data.filter( item => {
        if(item.status == "open"){
          setOpen(openCount + 1);
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
          setClosed(closedCount + 1);
          let filterItem = item;
          let filterItemStatus = filterItem.status;//save status to re-sort

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
        content: openTickets ? <Table TableData={openTickets} link={'/dashboard/tickets/'} buttonType="normal"  /> : <div>No Tickets</div> ,
        key:'opened',
        amount:openCount
    },
    {
        heading:'Shipped',
        content: shippedTickets ? <Table TableData={shippedTickets} link={'/dashboard/tickets/'} buttonType="normal"  /> : <div>No Tickets</div>,
        key:'shipped',
        amount:closedCount
    },
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
