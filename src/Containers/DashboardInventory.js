import React, {useState} from 'react';
import Tabs from 'Components/Tabs/Tabs';
import BoxLink from 'Components/BoxLink';
import Search from 'Components/Search/Search';
import Table from 'Components/Table/Table';
import Api from "Helpers/api";
import Spinner from "Images/spinner.gif";
const api = new Api();


const DashboardInventory = ({changeTitle}) =>{ 
    changeTitle('Inventory');
    const [ProductData , setProductData] = useState(null);
    const getData = async () => await api.getProductCategories()
    .then((response) => {
        setProductData(response.data)
    })
    .catch((err) => console.log(err));
    if(ProductData){
        // console.log(ProductData);
        const TabData = [ 
            {
                heading:'All Products',
                content:ProductData.map(product => {
                    console.log(product);
                    return(
                        <div>
                            <h3 class="mb-4 md:mb-2 font-extrabold text-gray-700 text-lg font-body">{product.name}</h3>
                            <div class="grid md:grid-cols-3 gap-4 mb-6 md:gap-10 md:mb-10">
                                
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
            <div class="relative">
                <Tabs tabs={TabData} headingComp={<Search/>} />
            </div>
        )
    }else{
        getData();
        return(
            <div class="relative w-full min-h-screen"> 
                <img class="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
            </div> 
        )
    }
        

}

export default DashboardInventory