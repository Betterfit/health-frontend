import React, {useState, useEffect} from "react";
import Tabs from 'Components/Tabs/Tabs';
import TicketSearch from 'Components/Search/TicketSearch';
import Table from 'Components/Table/List/Table';
import Api from "Helpers/api";
import {useAuthStore} from "Context/authContext";
import DashboardTicketSearch from "./DashboardTicketSearch";
import Translator from "Helpers/Translator";
import uuid from 'react-uuid'
import {
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";
import Spinner from "Images/spinner.gif";
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
        content: openTickets ? <Table key={uuid()}  TableData={openTickets} link={'/dashboard/ticket/'} buttonType="normal"  /> : <div>No Tickets</div> ,
        key:'opened',
        amount:openCount
    },
    {
        heading:'Shipped',
        content: shippedTickets ? <Table key={uuid()} TableData={shippedTickets} link={'/dashboard/ticket/'} buttonType="normal"  /> : <div>No Tickets</div>,
        key:'shipped',
        amount:closedCount
    },
  ]
  

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
      <Route exact path='/dashboard/tickets'>
        <h2 className="text-3xl text-dark-blue my-3">{Translator("Tickets")}</h2>
      </Route>
        {ticketData ? (
          <>          
            <TicketSearch extraClasses="float-right clear-both"  callBack={(e) => setSearchActive(e)} searchActive={searchActive} />
            <Route exact path='/dashboard/tickets'>
              <Tabs tabs={TabData} amount={true}  />
            </Route>
          </>
        ):(
          <div className="relative w-full min-h-screen"> 
            <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
          </div> 
        )}
      <Route path="/dashboard/tickets/search:query?">
            <DashboardTicketSearch supplierId={supplierId} />
      </Route>
    </div>  
  );
};

export default DashboardTickets;
