import React, {useState,useEffect} from 'react'
import BackNavigation from 'Components/Helpers/BackNavigation'
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import Table from 'Components/Table/Basic/Table';
import Api from "Helpers/api";
const api = new Api();

const DashboardProductList = (props) => {
    const { match } = props
    const ProductId = parseInt(match.params.id);
    const [lastProductId , setLastProductId] = useState(ProductId);
    const [ProductData , setProductData] = useState(null);
    const getData = async () => await api.getProduct(ProductId)
    .then((response) => {
        let arr = response.data;
        arr.product_variations = response.data.product_variations.map((variations) => {
            let variation = variations;
            variation.product_options = variations.product_options.map((options) => {
              let obj = {
                [options.option_label]: options.name,
                matched: "TODO",
                available: "TODO",
                total: 'TODO',
                pk: options.pk,
              };
              return obj;
            });
            return variation;
          });
        
        setProductData(arr)
    })
    .catch((err) => console.log(err));
    if(!ProductData){
        getData();
    }
    useEffect(() => {
        if(lastProductId !== ProductId){
            setLastProductId(ProductId);
            getData();
        }
    }); 
    return(
        <div className="lg:max-w-8xl mx-auto px-4 sm:px-6 md:px-8">

            {/* product title */}
            <div className="lg:hidden">
                <BackNavigation link="Back to products" />
            </div>
            {ProductData && (
                <div className="pt-8 md:pt-12">
                    <TitleUnderLine title={`${ProductData.name}`} />
                    {/* product description */}
                    <p className="text-paragraph">{ProductData.description}</p>
                    {ProductData.product_variations.map(product => {
                        return <Table TableData={product} ProductId={ProductId} /> 
                    })}
               </div>
            )}
        </div>
    )
}

export default DashboardProductList
