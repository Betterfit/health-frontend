import React , {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import API from 'Helpers/api';
import BackNavigation from 'Components/Helpers/BackNavigation';
import TitleUnderLine from 'Components/Content/TitleUnderLine';
import Table from 'Components/Table/List/Table';
import Search from 'Components/Search/Search';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const DashboardTicketSearch = ({supplierId}) => {
    const api = new API;
    let query = useQuery();    
    
    const [searchQuery , setSearchQuery] = useState(query.get('search'));
    const [searchData , setSearchData] = useState();
    const getSearchResults = async () => await api.getSearchTickets(supplierId,query.get('search'))
    .then((response) => {
        // console.log(response.data);
        setSearchData(response.data)
    })
    .catch((err) => console.log(err));
    if(!searchData){
        getSearchResults();
    }
    if (query.get('search')!== searchQuery){
        setSearchQuery(query.get('search'));
        getSearchResults();
    }
    
    return(
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            {searchData && (
                <>
                    <BackNavigation link="Back" />
                    <div className="flex justify-between mt-8">
                        <TitleUnderLine extraclasses="title-no-margin pt-0" nounderline={true} title={`Ticket search results for "${query.get('search')}"`} />
                    </div>
                    {/* {searchData.length > 0 && (
                        searchData.map(table => {
                            return(
                                <>
                                    <Table TableData={shippedTickets} link={'/dashboard/tickets/'} buttonType="normal"  /> : <div>No Tickets</div>
                                </>
                            );
                        })
                    )} */}
                </>
                
            )}          
        </div>
    );
}

export default DashboardTicketSearch