import React, {useState, useEffect} from 'react';
import BackNavigation from 'Components/Helpers/BackNavigation'
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import Inventory from 'Components/Inventory/Inventory'
import image from "Images/example_product.png"; //remove this later
import Api from "Helpers/api";
import { set } from 'js-cookie';
const api = new Api();


const DashboardProductDetail = (props) =>{
    const { match } = props;
    const product_id = parseInt(match.params.pid);
    const product_details_id = parseInt(match.params.id);
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState();
    const [isError, setIsError] = useState(false);
    console.log(match)
    const getData = async () =>
      await api
        .getProductVariant(product_id)
        .then((response) => {
            console.log("got response", response.data)
            let k = CleanUpProduct(response.data, product_details_id)
          setProduct(k);
          setProduct(response.data)
          setIsError(false);
          setIsLoading(false);
        })
        .catch((err) => { 
          setIsError(true);
        });
  
    useEffect(() => {
      console.log("getting data");
      getData();
    }, []);

    console.log(product)
    const CleanUpProduct = (product, details_id) => {
        let product_options = product.product_options.find(elem => elem.pk == details_id);
        const clean_product = {
            'name': product.name,
            'description': "to do",
            'product_size': product_options.name,

    }
        return clean_product;
    }
    return(
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
 
                <>
                    <BackNavigation link={`Back to Products`} />
                    <TitleUnderLine  />  
                    <div className="w-full flex place-self-center justify-self-center m-auto">
                     <Inventory product={product}/>
                    </div>
                </>
            
        </div>
        
    )
}

export default DashboardProductDetail