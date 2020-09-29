import React, {useState} from 'react'
import BackNavigation from 'Components/BackNavigation'
import TitleUnderLine from 'Components/TitleUnderLine'
import Table from 'Components/Table/Table';
import Api from "Helpers/api";
const api = new Api();

const DashboardProductList = (props) => {
    const { match } = props
    const ProductId = parseInt(match.params.id);
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
    return(
        <div>
            <BackNavigation link="Back to all products" />
            {/* product title */}
            {ProductData && (
                <>
                    <TitleUnderLine />
                    {/* product description */}
                    <p class="w-3/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis scelerisque enim, et venenatis arcu dictum nec. Praesent tristique lacinia nisi, pulvinar congue dui malesuada vitae.</p>
                    {ProductData.product_variations.map(product => {
                        console.log(product);
                        return <Table TableData={product} ProductId={ProductId} /> 
                    })}
               </>
            )}
        </div>
    )
}

export default DashboardProductList
