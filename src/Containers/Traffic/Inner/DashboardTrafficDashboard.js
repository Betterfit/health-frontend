import React , {useState, useEffect} from 'react';
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import ControllerCard from 'Components/TrafficControllerSideBar/ControllerCard';

import Api from "Helpers/api";
import Graph from "./DashboardGraph";
import Translator from "Helpers/Translator";

const api = new Api();
const DashboardTrafficDashboard = () => {
    const [ProductData , setProductData] = useState(null);

    const getData = async () => await api.getTrafficControllerSupply()
    .then((response) => {
        setProductData(response.data)
    })
    .catch((err) => console.log(err));

    useEffect(() => {
        getData();
    }, []);

    
    return(
        <div className="flex flex-col md:flex-row">
            <DashboardSideBar>
                <TitleUnderLine title={`Supply`} /> 
                {ProductData && (
                    <>
                        {
                            ProductData.map(product => {
                                return(
                                    <div key={`controllercard_${product.name}_parent`} className="flex flex-col mb-4">
                                        <div className="flex flex-row justify-between m-1 px-4">
                                            <span className="text-xs leading-4 font-medium uppercase tracking-wider uppercase text-betterfit-graphite">{product.name}</span>
                                            <div>
                                                <span className="text-xs leading-4 uppercase tracking-wider uppercase text-betterfit-graphite mr-2">{Translator("Orders")}</span>
                                                <span className="text-xs leading-4 uppercase tracking-wider uppercase text-betterfit-graphite ml-2">{Translator("Supply")}</span>
                                            </div>
                                        </div>
                                        {
                                            product.products.map((p,index) => {
                                                // status [critical,normal,warn],
                                                // name - the name of the product
                                                // orders - the quantity of orders
                                                // supply - the quantity of supply
                                                let cardData = {
                                                    name: p.name,
                                                    status:p.status,
                                                    orders:p.orders_count,
                                                    supply:p.supply_count,
                                                };
                                                return(
                                                    <ControllerCard key={`controllercard_${product.name}_${index}`} products={cardData} />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        } 
                        </>
                )}
            </DashboardSideBar>
            <div className={`w-full lg:relative lg:w-3/5 mx-auto h-screen overflow-y-scroll mt-8`}   >
                <Graph />
            </div>
        </div>
    )
}

export default DashboardTrafficDashboard;

