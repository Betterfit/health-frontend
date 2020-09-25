import React from 'react';
import Tabs from 'Components/Tabs/Tabs';
import BoxLink from 'Components/BoxLink';
const ProductData = require('Data/ProductData.json');
const TabData = [ 
    {
        heading:'All Products',
        content:ProductData.map(product => {
            return(
                <div>
                    <h3 class="mb-2 font-extrabold text-gray-700 text-lg font-body">{product.type}</h3>
                    <div class="grid grid-cols-3 gap-10 mb-10">
                        
                        {product.products.map(p =>{
                            return(
                            <BoxLink to="product/" link={p.name} borderColor='gray-400' textColor='light-text' id={p.id}/>
                            )
                        })}
                    </div>
                </div>
            )
        }),
        key:'products'
    },
    {
        heading:'My Inventory',
        content: 'my inventory!!',
        key:'my-inventory'
    }
]

const DashboardInventory = () =>{
    return(
        <Tabs tabs={TabData} />
    )
}

export default DashboardInventory