import React, {useState} from 'react';
import Tabs from 'Components/Tabs/Tabs';
import BoxLink from 'Components/BoxLink';
import Api from "Helpers/api";
const api = new Api();



const DashboardInventory = () =>{ 
    const [ProductData , setProductData] = useState(null);
    const getData = async () => await api.getProductCategories()
    .then((response) => {
        setProductData(response.data)
    })
    .catch((err) => console.log(err));
    if(ProductData){
        console.log(ProductData);
        const TabData = [ 
            {
                heading:'All Products',
                content:ProductData.map(product => {
                    return(
                        <div>
                            <h3 class="mb-2 font-extrabold text-gray-700 text-lg font-body">{product.name}</h3>
                            <div class="grid grid-cols-3 gap-10 mb-10">
                                
                                {product.products.map(p =>{
                                    return(
                                    <BoxLink to="product/" link={p.name} borderColor='gray-400' textColor='light-text' id={p.pk}/>
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
        return(
            <Tabs tabs={TabData} />
        )
    }else{
        getData();
        return(
            <h1></h1>
        )
    }

}

export default DashboardInventory