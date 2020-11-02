import React, {useState} from 'react';
import ListLink from 'Components/Content/ListLink';
import TagLink from 'Components/Content/TagLink';
import ResourceLink from 'Components/Content/ResourceLink';
import Search from 'Components/Search/Search';
import Api from "Helpers/api";
import Slider from "Components/Slider/Slider";
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';


const api = new Api();
const DashboardResources = () => {
    const [title , setTitle] = useState('Resources');
    const [searchActive , setSearchActive] = useState(false);
    const resourceTypes = {
        'Facility': '#56BAC8',
        'Supplier': '#EA8683',
        'Researcher': '#A799F3',
        'Lab': '#61C091',
        'Regulation': '#7FAAF4',
    }
    const tagList = [
        'Masks',
        'Gowns',
        'Sanitizers',
        'Wipes',
        'Filters',
        'Reusable Respirators',
        'Safety Test Kits',
        'IV Solution',
        'Vaccine',
    ]
    /* mock data to be replaced */
    const resourceList = {
        resource1: {
            resourceType: "Facility",
            resourceName: "University of Alberta Hospital",
            tagList: [],
        },
        resource2: {
            resourceType: "Supplier",
            resourceName: "Lift Medical",
            tagList: ["Masks", "Gowns"],
        },
        resource3: {
            resourceType: "Researcher",
            resourceName: "Adrian Gyuricska",
            tagList: ["IV Solution"],
        },
        resource4: {
            resourceType: "Lab",
            resourceName: "University of Alberta",
            tagList: [],
        },
        resource5: {
            resourceType: "Regulation",
            resourceName: "Lift Medical",
            tagList: [],
        },
        resource6: {
            resourceType: "Researcher",
            resourceName: "Adrian Gyuricska",
            tagList: ["IV Solution"],
        },
        resource7: {
            resourceType: "Facility",
            resourceName: "Royal Alexandra Hospital",
            tagList: ["Sanitizers"],
        },
        resource8: {
            resourceType: "Facility",
            resourceName: "University of Alberta Hospital",
            tagList: [],
        },
        resource9: {
            resourceType: "Supplier",
            resourceName: "Lift Medical",
            tagList: ["Masks", "Gowns", "Wipes", "Filters", "Vaccine"],
        },
        resource10: {
            resourceType: "Researcher",
            resourceName: "Adrian Gyuricska",
            tagList: ["IV Solution"],
        },
        resource11: {
            resourceType: "Lab",
            resourceName: "University of Alberta",
            tagList: ["Safety Test Kits", "Reusable Respirators"],
        },
        resource12: {
            resourceType: "Regulation",
            resourceName: "Lift Medical",
            tagList: [],
        },
        resource13: {
            resourceType: "Researcher",
            resourceName: "Adrian Gyuricska",
            tagList: ["Wipes"],
        },
        resource14: {
            resourceType: "Facility",
            resourceName: "Royal Alexandra Hospital",
            tagList: ["Sanitizers"],
        },
    }
    const [ShowResourceDetails, SetShowDetails] = useState({
        resource: false,
      });
    const toggleSlider = () => {
        if (ShowResourceDetails.resource)
            SetShowDetails({resource:false});
        else {
            SetShowDetails({resource:true})
        }
    }
    const matchResourceColor = (type) => {
        return resourceTypes[type];
    };
    return (
        <div className="resource-dashboard">
            <DashboardSideBar>
                <h2 className="text-3xl text-dark-blue my-3">{title}</h2>
                <Search type="bar" />
                <div className="border-b border-gray-400 mt-5" />
                <div>
                    <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">Resource Type</h3>
                    {Object.entries(resourceTypes).map(([key, value]) => {
                        return(
                            <ListLink bulletColor={value} text={key} />
                        )
                    })}
                </div>
                <div>
                    <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">Tags</h3>
                    {tagList.map(p =>{
                        return(
                            <TagLink tagType={p} />
                        )
                    })}
                </div>
            </DashboardSideBar>
            <div className="flex-grow wrap max-h-screen p-4 h-full rounded-lg overflow-scroll">
                <div className="py-8">
                    {Object.entries(resourceList).map(([key, value]) => {
                        return(
                            <div className="resource-container m-2 rounded-md cursor-pointer" onClick={toggleSlider}>
                                <ResourceLink resourceColor={matchResourceColor(value.resourceType)} resourceType={value.resourceType} resourceName={value.resourceName} tagList={value.tagList} />
                            </div>
                        )
                    })}
                </div>
                <Slider active={ShowResourceDetails.resource} close={toggleSlider}/>
            </div>
        </div>
    );
}

export default DashboardResources