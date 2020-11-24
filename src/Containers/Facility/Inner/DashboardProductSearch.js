import React , {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import API from 'Helpers/api';
import BackNavigation from 'Components/Helpers/BackNavigation';
import TitleUnderLine from 'Components/Content/TitleUnderLine';
import Table from "Components/Table/Full/Table";
import uuid from 'react-uuid';
import ProductSearch from 'Components/Search/ProductSearch';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const DashboardProductSearch = ({}) => {
    const api = new API;
    let query = useQuery();    
    const [searchQuery , setSearchQuery] = useState(query.get('search'));
    const [searchData , setSearchData] = useState();
    const getSearchResults = async () => await api.getProductOptionsSearch(query.get('category'),query.get('search'))
    .then((response) => {
        console.log(response.data)
        setSearchData(response.data);
    })
    .catch((err) => console.log(err));

    useEffect(() => {
        getSearchResults();
    }, []);
    
    if (query.get('search')!== searchQuery){
        setSearchQuery(query.get('search'));
        getSearchResults();
    }
    

    return(
        <div>
            {searchData && (
                <>
                    <BackNavigation link="Back" />
                    <div className="flex justify-between mt-8">
                        <TitleUnderLine extraclasses="title-no-margin pt-0" nounderline={true} title={`Product search results for "${query.get('search')}"`} />
                    </div>
                    {/* <ProductSearch CategoryName = {CategoryName} CategoryID = {CategoryID} /> */}
                    {searchData.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 mb-6 md:mb-10 customproductgrid">
                            {/* {searchData.map(item => {
                                // let product = {
                                //     name: item.name,
                                // }
                                // return(
                                //     <ProductCard
                                //     key={uuid()}
                                //     product={p2}
                                //     product_details={p3}
                                //     category={CategoryData.name}
                                //     extra={CategoryData}
                                //     parent={p.name ? p.name : null}
                                //     />
                                // )
                            })} */}


                            {/* {CategoryData.products.map((p) =>
                            p.product_variations.map((p2) =>{
                                return(
                                p2.product_options.map((p3) => (
                                    <ProductCard
                                    key={`${p3.name}`}
                                    product={p2}
                                    product_details={p3}
                                    category={CategoryData.name}
                                    extra={CategoryData}
                                    parent={p.name ? p.name : null}
                                    />
                                ))
                                )
                            }) */}
                            {/* )} */}

                        </div>
                    ):(
                        <div>No results for {query.get('search')}</div>
                    )
                    }
                </>
                
            )}          
        </div>
    );
}

export default DashboardProductSearch