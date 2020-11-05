import React , {useState, useEffect} from 'react';
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import ControllerCard from 'Components/TrafficControllerSideBar/ControllerCard';
import Api from "Helpers/api";
import GraphApi from "Helpers/graphApi";
import FilterFields from "Components/Graph/FilterFields";
import SideBarTabs from "Components/Graph/SideBarTab";

import moment from 'moment';
import 'tui-chart/dist/tui-chart.css'
import { LineChart } from "@toast-ui/react-chart";

const options = {
    chart: {
        width: 525,
        height: 400,
        title: "Data By Health Regions",
    },
    yAxis: {
        title: "Health Regions"
    },
    xAxis: {
        title: "Date",
        type: "date",
    },
    series: {
        showDot: false,
        zoomable: true,
    },
    legend: {
        align: 'bottom'
    }
};

const allRegion = {
  "New Brunswick": [
    "Zone 7: Central East Region (Miramichi)",
    "Zone 6: North East Region (Bathurst)",
    "Zone 5: North Central Region (Campbellton)",
    "Zone 4: North West Region (Edmundston)",
    "Zone 3: Central West Region (Fredericton)",
    "Zone 2: South Central Region (Saint John)",
    "Zone 1: South East Region (Moncton)"
  ],
  "Ontario": [
    "York Region Public Health Services",
    "Windsor-Essex County Health Unit",
    "Wellington-Dufferin-Guelph Public Health",
    "Toronto Public Health",
    "Timiskaming Health Unit",
    "Thunder Bay District Health Unit",
    "Sudbury & District Health Unit",
    "Southwestern Public Health",
    "Simcoe Muskoka District Health Unit",
    "Renfrew County and District Health Unit",
    "Region of Waterloo, Public Health",
    "Porcupine Health Unit",
    "Peterborough Public Health",
    "Peel Public Health",
    "Ottawa Public Health",
    "Northwestern Health Unit",
    "North Bay Parry Sound District Health Unit",
    "Niagara Region Public Health Department",
    "Middlesex-London Health Unit",
    "Leeds, Grenville and Lanark District Health Unit",
    "Lambton Public Health",
    "Kingston, Frontenac and Lennox & Addington Public Health",
    "Huron Perth District Health Unit",
    "Hastings and Prince Edward Counties Health Unit",
    "Hamilton Public Health Services",
    "Halton Region Health Department",
    "Haliburton, Kawartha, Pine Ridge District Health Unit",
    "Haldimand-Norfolk Health Unit",
    "Grey Bruce Health Unit",
    "Eastern Ontario Health Unit",
    "Durham Region Health Department",
    "Chatham-Kent Health Unit",
    "Brant County Health Unit",
    "Algoma Public Health Unit"
  ],
  "Manitoba": [
    "Winnipeg",
    "Southern Health-Santé Sud",
    "Prairie Mountain Health",
    "Northern",
    "Interlake-Eastern"
  ],
  "Newfoundland and Labrador": [
    "Western Regional Health Authority",
    "Labrador-Grenfell Regional Health Authority",
    "Eastern Regional Health Authority",
    "Central Regional Health Authority"
  ],
  "Alberta": [
    "South Zone",
    "North Zone",
    "Edmonton Zone",
    "Central Zone",
    "Calgary Zone"
  ],
  "Prince Edward Island": [
    "Prince Edward Island"
  ],
  "Nova Scotia": [
    "Western",
    "Northern",
    "Eastern",
    "Central",
    "Nova Scotia"
  ],
  "Quebec": [
    "Abitibi-Témiscamingue",
    "Estrie",
    "Outaouais",
    "Capitale-Nationale",
    "Chaudière-Appalaches",
    "Côte-Nord",
    "Gaspésie – Îles-de-la-Madeleine",
    "Mauricie-et-Centre-du-Québec",
    "Montérégie",
    "Lanaudière",
    "Laurentides",
    "Laval",
    "Montréal",
    "Terres-Cries-de-la-Baie-James",
    "Bas-Saint-Laurent",
    "Nord-du-Québec",
    "Nunavik",
    "Saguenay – Lac-Saint-Jean"
  ],
  "Saskatchewan": [
    "Far North Zone",
    "North Zone",
    "Regina",
    "Saskatoon",
    "South Zone",
    "Central Zone"
  ],
  "British Columbia": [
    "Vancouver Coastal",
    "Fraser",
    "Northern",
    "Vancouver Island",
    "Interior"
  ]
}

const parseGraphQL = (data, today, endDate) => {

    let parsedData = {
        'British Columbia': {},
        'Alberta': {},
        'Manitoba': {},
        'Saskatchewan': {},
        'Ontario': {},
        'Quebec': {},
        'Newfoundland and Labrador': {},
        'Prince Edward Island': {},
        'Nova Scotia': {},
        'New Brunswick': {}
    }

    let cases = data['data']['allCases']['edges'];
    // generate an array of dates that we are displaying on the graph
    let reportedDate = [];
    while (endDate <= today) {
        reportedDate.push(endDate.format('YYYY-M-D'));
        endDate = endDate.clone().add(1, 'd');
    }
    parsedData['reportedDate'] = reportedDate;

    // loop through our case data and append it to each regions array so we can easily display it
    cases.forEach(element => {
        let healthRegion = element.node.healthRegion.healthRegion;
        let province = element.node.healthRegion.province;

        if(healthRegion in parsedData[province]){
            parsedData[province][healthRegion].activeCases.push(element.node.activeCases)

        }else{
            let caseData = {'activeCases': [element.node.activeCases]}
            parsedData[province][healthRegion] = caseData;
        }
    });

    return parsedData;
};

const api = new Api();
const graphApi = new GraphApi();
// get todays date
// and end range for date
const today = moment().subtract(1, 'days');
const endDate = moment().subtract(7, 'days');
const DashboardTrafficDashboard = () => {
    const [ProductData , setProductData] = useState(null);
    const [CaseData, setCaseData] = useState(null);
    const [DisplayData, setDisplayData] = useState({'categories': [], 'series': []});

    const getData = async () => await api.getTrafficControllerSupply()
    .then((response) => {
        setProductData(response.data)
    })
    .catch((err) => console.log(err));

    const getGraphData = async () => await graphApi.getCaseData(`reportedDateGt: "${endDate.format('YYYY-M-D')}", first: 800, sortBy: "reportedDateAsc"`)
    .then((response) => {
        console.log(response.data)
        let caseData = parseGraphQL(response.data, today, endDate)
        setCaseData(caseData);
        setDisplayData({'categories': caseData.reportedDate, 'series': []})
    })
    .catch((err) => console.log(err));

    useEffect(() => {
        getData();
        getGraphData();
    }, []);

    const FilterData = (() => {
        return Object.keys(allRegion).map((key, idx) => {
            return {
                heading: key,
                content: allRegion[key],
            }
        })
    })();

    // add a region to the graph
    const addRegionToGraph = (e, province, region) => {
        e.preventDefault();

        let series = DisplayData.series.concat();
        let categories = DisplayData.categories.concat()

        // break out of onclick if region has already been added
        // TODO does checking if the element exists in the graph already have any issues
        for(let i = 0; i < series.length; i++){
            if(series[i].name === region){
                return 
            }
        }

        series.push({'name': region, 'data': CaseData[province][region]['activeCases']});

        setDisplayData({
            'categories': categories,
            'series': series
        });
    }

    const graphTabs = [
        {heading: 'Active Cases', key: 'active'},
        {heading: 'New Cases', key: 'new'},
        {heading: 'Daily Deaths', key: 'deaths'},
    ]

    
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
                <div className="flex w-full flex-row ">
                  <div className="w-1/12 flex-col h-full py-2 sm:flex md:block">
                    <SideBarTabs tabs={graphTabs}/>
                  </div>
                  <div className="w-11/12 flex">
                    <LineChart data={DisplayData} options={options}/>
                  </div>
                </div>
                <FilterFields filterData={FilterData} onClickEvent={addRegionToGraph}/>
            </div>
        </div>
    )
}

export default DashboardTrafficDashboard;

