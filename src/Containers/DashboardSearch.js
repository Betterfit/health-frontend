import React , {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import API from 'Helpers/api';
import BackNavigation from 'Components/Helpers/BackNavigation';
import TitleUnderLine from 'Components/Content/TitleUnderLine';
import Table from 'Components/Table/Basic/Table';
import Search from 'Components/Search/Search';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const DashboardSearch = () => {
    const api = new API;
    let query = useQuery();    
    
    const [searchQuery , setSearchQuery] = useState(query.get('search'));
    const [searchData , setSearchData] = useState();
    const getSearchResults = async () => await api.getSearchResults(query.get('search'))
    .then((response) => {
        let arr = response.data;
        arr.map(productCat => {
            productCat.products.map(products => {
                products.product_variations = products.product_variations.map((variations) => {
                    let variation = variations;
                    variation.product_options = variations.product_options.map((options) => {
                      let obj = {
                        [options.option_label]: options.name,
                        matched: options.allotted,
                        available: options.quantity,
                        total: options.allotted + options.quantity,
                        pk: options.pk,
                      };
                      return obj;
                    });
                    return variation;
                });
            })
        })
        console.log(arr);
        setSearchData(arr)
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
                        <TitleUnderLine extraclasses="title-no-margin pt-0" nounderline={true} title={`Search results for "${query.get('search')}"`} />
                    </div>
                    {searchData.length > 0 && (
                        searchData.map(productCat => {
                            return(
                                productCat.products.map(product=> {
                                    return(
                                        <>
                                        <h2 className="text-2xl text-gray-700 font-bold">{product.name}</h2>

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