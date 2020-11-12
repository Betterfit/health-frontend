import React, {useState, useEffect} from 'react';
import BackNavigation from 'Components/Helpers/BackNavigation'
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import Inventory from 'Components/Inventory/Inventory'
import Api from "Helpers/api";
const api = new Api();

const DashboardProductDetail = (props) =>{
    const { match } = props
    const VariantId = parseInt(match.params.id);
    const OptionId = parseInt(match.params.oid);
    const [ProductData , setProductData] = useState(null);
    const getData = async () => await api.getSupplierProductQuantity (1, OptionId)
    .then((response) => {
        let data = response.data;
        setProductData({ 
            "product_name": data.product_option.product_variation,
            "product_label": data.product_option.option_label,
            "product_label_value": data.product_option.name,
            "product_description": data.product_option.product_description,
            "product_alloted": data.alloted_quantity,
            "product_available": data.quantity,
            "product_image": data.product_option.product_image,
            "pk":data.product_option.pk,
         })
    })
    .catch((err) => console.log(err));
    
    
  useEffect(() => {
    getData();
  }, ProductData);
console.log("PRODU", ProductData)


    return(
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
            {ProductData && (
                <>
                    <BackNavigation link={`Back`} />
                    <TitleUnderLine title={ProductData.product_name} />  
                    <div className="w-full flex place-self-center justify-self-center m-auto">
                        {ProductData && (
                            <Inventory product={ProductData} edit={props.edit}></Inventory>
                        )}
                    </div>
                </>
            )}
        </div>
        
    )
}

export default DashboardProductDetail