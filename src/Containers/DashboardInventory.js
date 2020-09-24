import React from 'react';

import Tabs from 'Components/Tabs/Tabs'

const ProductData = [
    {
        type:'Gowns',
        products:[
            {
                name:'Dispoable',
            },
            {
                name:'Reusable'
            }
        ]

    }
]


const TabData = [ 
    {
        heading:'All Products',
        content:ProductData.map(product => {
            return(
                <div>
                    {product.products.map(p =>{
                        return(
                            <div>{p.name}</div>
                        )
                    })}
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