import React from 'react';
import BackNavigation from 'Components/BackNavigation'
import TitleUnderLine from 'Components/TitleUnderLine'
import Inventory from 'Components/Inventory/Inventory'
import image from "Images/example_product.png"; //remove this later

let dummydata = { 
    "product_name": "NaCl 0.9% Minibag pk/4",
    "product_size": "100ml",
    "product_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis scelerisque enim, et venenatis arcu dictum nec. Praesent tristique lacinia nisi, pulvinar congue dui malesuada vitae.",
    "product_alloted": 244,
    "product_available": 430,
    "product_image": {image},
}


const DashboardProductDetail = () =>{
    return(
        <div>
            <BackNavigation link="Back to" />
            <TitleUnderLine title='Some PRODUCT!!!' />  
            <div className="w-full flex place-self-center justify-self-center m-auto">
                <Inventory product={dummydata} edit={false}></Inventory>
            </div>
        </div>
        
    )
}

export default DashboardProductDetail