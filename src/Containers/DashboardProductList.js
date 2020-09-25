import React, {useState} from 'react'
import BackNavigation from 'Components/BackNavigation'
import TitleUnderLine from 'Components/TitleUnderLine'
import Table from 'Components/Table/Table';
const ProductData = require('Data/ProductData.json');
const DashboardProductList = (props) => {
    const [ state, setState ] = useState({
        product: null
    })
    const { match } = props
    const ProductId = parseInt(match.params.id);
    let ProductParent;
    let Product;
    ProductData.forEach(productType => {
        // productType.products.map(p => {
        productType.products.forEach(p => {
            if(p.id == ProductId){
                Product = p;
                ProductParent = productType;
            }
        })
    });
    console.log(ProductParent)
    // TODO : restructure data when we have an api

    return(
        <div>
            <BackNavigation link="Back to all products" />
            {/* product title */}
            <TitleUnderLine title={Product.name +' '+ ProductParent.type} />
            {/* product description */}
            <p class="w-3/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis scelerisque enim, et venenatis arcu dictum nec. Praesent tristique lacinia nisi, pulvinar congue dui malesuada vitae.</p>
            <Table TableData={Product} />

        </div>
    )
}

export default DashboardProductList
