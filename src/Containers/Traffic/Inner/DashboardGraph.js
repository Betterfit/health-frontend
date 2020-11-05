import React , {useState, useEffect} from 'react';

import GraphApi from "Helpers/graphApi";
import FilterFields from "Components/Graph/FilterFields";
import SideBarTabs from "Components/Graph/SideBarTab";

import moment from 'moment';
import 'tui-chart/dist/tui-chart.css'
import { LineChart } from "@toast-ui/react-chart";

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
            parsedData[province][healthRegion].newCases.push(element.node.newCases)
            parsedData[province][healthRegion].deaths.push(element.node.deaths)

        }else{
            let data = {
                'activeCases': [element.node.activeCases],
                'newCases': [element.node.newCases],
                'deaths' : [element.node.deaths]

            }

            parsedData[province][healthRegion] = data;
        }
    });

    return parsedData;
};

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

const graphTabs = [
    {heading: 'Active Cases', key: 'activeCases'},
    {heading: 'New Cases', key: 'newCases'},
    {heading: 'Daily Deaths', key: 'deaths'},
]

const graphApi = new GraphApi();
// get todays date
// and end range for date
const today = moment().subtract(1, 'days');
const endDate = moment().subtract(7, 'days');

const Graph = () => {
	const [CaseData, setCaseData] = useState(null);
    const [DisplayData, setDisplayData] = useState({'categories': [], 'series': []});
    // these states might be unecessary, however we have to distinguish between provinces
    // since some health regions have the same name
    const [SelectedRegions, setSelectedRegions] = useState([]);
    const [CurTab, setCurTab] = useState(graphTabs[0].key);

    const getGraphData = async () => await graphApi.getCaseData(`reportedDateGt: "${endDate.format('YYYY-M-D')}", first: 800, sortBy: "reportedDateAsc"`)
    .then((response) => {
        let caseData = parseGraphQL(response.data, today, endDate)
        setCaseData(caseData);
        setDisplayData({'categories': caseData.reportedDate, 'series': []})
    })
    .catch((err) => console.log(err));

    useEffect(() => {
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
        let selectedRegions = SelectedRegions.concat()

        // break out of onclick if region has already been added
        // TODO does checking if the element exists in the graph already have any issues
        for(let i = 0; i < series.length; i++){
            if(series[i].name === region){
                return 
            }
        }

        series.push({'name': region, 'data': CaseData[province][region][CurTab]});
        selectedRegions.push({'province': province, 'healthRegion': region});

        setDisplayData({
            'categories': categories,
            'series': series
        });
        setSelectedRegions(selectedRegions)
    }

    // handle click when changing tabs so display data is reflected
    const handleTabChange = (key) => {
        setCurTab(key);

        let categories = DisplayData.categories.concat()
        let newData = SelectedRegions.map(region => {
            return {
                'name': region.healthRegion, 
                'data': CaseData[region.province][region.healthRegion][key]
            }
        })

        setDisplayData({
            'categories': categories,
            'series': newData
        })

    }

    return (
      <div>
    	<div className="flex w-full flex-row ">
          <div className="w-1/12 flex-col h-full py-2 sm:flex md:block">
            <SideBarTabs tabs={graphTabs} activeTab={CurTab} handleClick={handleTabChange}/>
          </div>
          <div className="w-11/12 flex">
            <LineChart data={DisplayData} options={options}/>
          </div>
         </div>
         <FilterFields filterData={FilterData} onClickEvent={addRegionToGraph}/>
       </div>
    )

}

export default Graph;