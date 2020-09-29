import React, {useState} from 'react';
import BackNavigation from 'Components/BackNavigation'
import TitleUnderLine from 'Components/TitleUnderLine'
import Inventory from 'Components/Inventory/Inventory'
import image from "Images/example_product.png"; //remove this later
import Api from "Helpers/api";
const api = new Api();


const DashboardProductDetail = (props) =>{

    const { match } = props
    const VariantId = parseInt(match.params.id);
    const OptionId = parseInt(match.params.oid);
    // TODO : restructure data when we have an api
    const [VariantData , setVariantData] = useState(null);
    const [ProductData , setProductData] = useState(null);
    const [OptionData , setOptionData] = useState(null);
    const getData = async () => await api.getProductVariant(VariantId)
    .then((response) => {
        setVariantData(response.data)
        let OptionData = response.data.product_options.filter(item => item.pk === OptionId);
        setOptionData(OptionData)
        setProductData({ 
            "product_name": response.data.name,
            "product_size": OptionData[0].name,
            "product_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis scelerisque enim, et venenatis arcu dictum nec. Praesent tristique lacinia nisi, pulvinar congue dui malesuada vitae.",
            "product_alloted": 244,
            "product_available": 430,
            "product_image": {image},
        })
    })
    .catch((err) => console.log(err));
    
    if(!VariantData){
        getData();
    }



    return(
        <div>
            {VariantData && (
                <>
                    <BackNavigation link="Back to" />
                    <TitleUnderLine title={ OptionData ?  `${OptionData[0].name} - ${VariantData.name}` : ''} />  
                    <div className="w-full flex place-self-center justify-self-center m-auto">
                        {ProductData && (
                            <Inventory product={ProductData} edit={false}></Inventory>
                        )}
                    </div>
                </>
            )}
        </div>
        
    )
}

export default DashboardProductDetail