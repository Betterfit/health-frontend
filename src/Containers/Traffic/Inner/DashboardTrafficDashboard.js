import React , {useState, useEffect} from 'react';
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import ControllerCard from 'Components/TrafficControllerSideBar/ControllerCard';
import Api from "Helpers/api";
import GraphApi from "Helpers/graphApi";
import parseGraphQL from "Helpers/parseGraphQL";

import moment from 'moment';
import { LineChart } from "@toast-ui/react-chart";

const options = {
    chart: {
        width: 350,
        height: 400,
        title: "Data By Health Regions",
    },
    yAxis: {
        title: "Health Regions"
    },
    xAxis: {
        title: "Date",
        type: "datetime",
    },
    series: {
        showDot: false,
        zoomable: true,
        spline: true,
    },
    legend: {
        align: 'bottom'
    }
};

const api = new Api();
const graphApi = new GraphApi();
// get todays date
// and end range for date
const today = moment();
const endDate = moment().subtract(7, 'days');
const DashboardTrafficDashboard = () => {
    const [ProductData , setProductData] = useState(null);
    const [CaseData, setCaseData] = useState(null);
    const [DisplayData, setDisplayData] = useState({'categories': [], 'series': []});
    const parseDataToVisualData = (data) => {
        let cases = data['data']['allCases']['edges'];
        console.log(parseGraphQL(cases, today, endDate));
    }

    const getData = async () => await api.getTrafficControllerSupply()
    .then((response) => {
        setProductData(response.data)
    })
    .catch((err) => console.log(err));

    const getGraphData = async () => await graphApi.getCaseData(`reportedDateGt: "${endDate.format('YYYY-M-D')}", first: 800, sortBy: "reportedDate"`)
    .then((response) => {
        parseDataToVisualData(response.data);
    })
    .catch((err) => console.log(err));

    useEffect(() => {
        getData();
        getGraphData();
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
                                                <span className="text-xs leading-4 uppercase tracking-wider uppercase text-betterfit-graphite mr-2">Orders</span>
                                                <span className="text-xs leading-4 uppercase tracking-wider uppercase text-betterfit-graphite ml-2">Supply</span>
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
                                    // <div>
                                    //     <h3 className="mb-4 md:mb-2 font-extrabold text-gray-700 text-xs font-body ml-6 uppercase font-bold tracking-wider">{product.name}</h3>
                                    //     <div className="grid md:grid-cols-1 gap-2 mb-6 md:mb-10">
                                    //         {product.products.map(p =>{
                                    //             return(
                                    //             <BoxLink key={`${p.name}`} to="/dashboard/inventory/product/" link={p.name} textColor='dark-blue' id={p.pk}/>
                                    //             )
                                    //         })}
                                    //     </div>
                                    // </div>
                                )
                            })
                        } 
                        </>
                )}
            </DashboardSideBar>
            <div className={`w-full bg-gray-100 lg:relative lg:w-3/5 mx-auto h-screen overflow-y-scroll mt-8`}   >
                <LineChart data={DisplayData} options={options} />
            </div>
        </div>
    )
}

export default DashboardTrafficDashboard;

