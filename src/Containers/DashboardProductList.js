import React, {useState,useEffect} from 'react'
import BackNavigation from 'Components/Helpers/BackNavigation'
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import Table from 'Components/Table/Basic/Table';
import Api from "Helpers/api";
import Spinner from "Images/spinner.gif";
const api = new Api();

const DashboardProductList = (props) => {
    const { match } = props
    const ProductId = parseInt(match.params.id);
    const [lastProductId , setLastProductId] = useState(ProductId);
    // TODO : restructure data when we have an api
    const [ProductData , setProductData] = useState(null);
    const getData = async () => await api.getProduct(ProductId)
    .then((response) => {
        setProductData(response.data)
    })
    .catch((err) => console.log(err));
    if(!ProductData){
        getData();
    }
    // console.log(JSON.stringify(ProductData))
    useEffect(() => {
        if(lastProductId !== ProductId){
            // console.log('getting data');
            setLastProductId(ProductId);
            getData();
        }
    }); 
    return(
        <div className="lg:max-w-8xl mx-auto px-4 sm:px-6 md:px-8">

            {/* product title */}
            <div className="lg:hidden">
                <BackNavigation link="Back to products" />
            </div>
            {ProductData && (
                <div className="pt-8 md:pt-12">
                    <TitleUnderLine title={`${ProductData.name}`} />
                    {/* product description */}
                    <p className="text-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis scelerisque enim, et venenatis arcu dictum nec. Praesent tristique lacinia nisi, pulvinar congue dui malesuada vitae.</p>
                    {ProductData.product_variations.map(product => {
                        return <Table TableData={product} ProductId={ProductId} /> 
                    })}
               </div>
            )}
        </div>
    )
}

export default DashboardProductList
