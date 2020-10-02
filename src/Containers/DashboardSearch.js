import React , {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import API from 'Helpers/api';
import BackNavigation from 'Components/BackNavigation';
import TitleUnderLine from 'Components/TitleUnderLine';
import Table from 'Components/Table/Table';
import Search from 'Components/Search/Search';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const DashboardSearch = ({changeTitle}) => {
    const api = new API;
    let query = useQuery();    
    
    const [searchQuery , setSearchQuery] = useState(query.get('search'));
    changeTitle(`Search - ${query.get('search')} `)
    const [searchData , setSearchData] = useState();
    const getSearchResults = async () => await api.getSearchResults(query.get('search'))
    .then((response) => {
        console.log(response.data);
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
        <div>
            {searchData && (
                <>
                    <BackNavigation link="Back to all products" />
                    <div class="flex justify-between mt-8">
                        <TitleUnderLine extraclasses="title-no-margin pt-0" nounderline={true} title={`Search results for "${query.get('search')}"`} />
                        <Search />
                    </div>
                    {searchData.length > 0 && (
                        searchData.map(productCat => {
                            return(
                                productCat.products.map(product=> {
                                    return(
                                        <>
                                        <h2 class="text-2xl text-gray-700 font-bold">{product.name}</h2>

                                        {
                                            product.product_variations.length > 0 && (
                                                product.product_variations.map(p => {
                                                    return(
                                                        <Table TableData={p} ProductId={product.pk} /> 
                                                    )
                                                })
                                            )
                                        }
                                        {product.product_variations.length <= 0 && (
                                            <Table TableData={product} ProductId={product.pk} />     
                                        )}
                                        </>
                                        
                                    )
                                })
                            )
                        })
                    )}
                </>
                
            )}          
        </div>
    );
}

export default DashboardSearch