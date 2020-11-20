import React, {useState, useEffect} from 'react';
import Api from "Helpers/api";

//Components
import BackNavigation from 'Components/Helpers/BackNavigation'
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import ProductDetailsCard from "Components/Content/ProductDetailsCard"
import EditProductForm from "Components/Forms/EditProductForm";



const DashboardProductDetail = (props) =>{
    const api = new Api();
    const { match } = props
    const optionId = parseInt(match.params.oid);
    let supplier_id = JSON.parse(localStorage.getItem("user")).user_profile?.supplier;
    const [ProductData , setProductData] = useState(null);
    const getData = async () => await api.getSupplierProductQuantity (supplier_id, optionId)
    .then((response) => {
        let data = response.data;
        setProductData({ 
            "product_category": data.product_option.product_category,
            "product_name": data.product_option.product + " - " +  data.product_option.product_variation,
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
  }, []);


    return(
        <>
          {ProductData && (

          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
            <BackNavigation link={`Back`} />
            <TitleUnderLine title={ProductData.product_name} />  
              <div className="w-full flex place-self-center justify-self-center m-auto">
                <ProductDetailsCard product={ProductData}>
                  <EditProductForm
                    matched={ProductData.product_alloted}
                    avail={ProductData.product_available}
                    id={ProductData.pk}
                  />
                </ProductDetailsCard>
              </div>
          </div>

          )}
        </>

        
    )
}

export default DashboardProductDetail