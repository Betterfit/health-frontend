import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import TagLink from 'Components/Content/TagLink';
import Slider from "Components/Slider/Slider";
import SupplierCard from "Components/ResourceProfile/SupplierCard";
import ResearchCard from "Components/ResourceProfile/ResearchCard";
import LabCard from "Components/ResourceProfile/LabCard";
import FacilityCard from "Components/ResourceProfile/FacilityCard";

const ResourceLink = ({resourceColor, resourceType, resourceName, tagList, resourceDetails, resourceCode}) => {
    const filterTagCodes = () => {
        const tagCodes = []
        for (let i=0; i<tagList.length; i++) {
            tagCodes.push(tagList[i].pk);
        }
        return tagCodes
    }
    const resourceCard = (function(resourceCode) {
    switch (resourceCode) {
        case 1:
            return <FacilityCard name={resourceName} tagList={filterTagCodes()} details={resourceDetails} color={resourceColor}/>;
        case 2:
            return <LabCard name={resourceName} tagList={filterTagCodes()} details={resourceDetails} color={resourceColor}/>;
        case 3:
            return <ResearchCard name={resourceName} tagList={filterTagCodes()} details={resourceDetails} color={resourceColor}/>;
        case 4:
            return <SupplierCard name={resourceName} tagList={filterTagCodes()} details={resourceDetails} color={resourceColor}/>;
        default:
            return <div/>;
        }
    })(resourceCode);
    const [ShowResourceDetails, SetShowDetails] = useState({
        show: false,
      });
    const toggleSlider = () => {
        if (ShowResourceDetails.show)
            SetShowDetails({show:false});
        else {
            SetShowDetails({show:true})
        }
    }
    return(
        <div className="flex p-1" onClick={toggleSlider}>
            <div className="w-1 rounded-md mr-2" style={{background:resourceColor}}/>
            <div className="p-2">
                <div className="font-medium text-gray-700 font-body uppercase tracking-widest text-xs">
                    {resourceType}
                </div>
                <div className="font-semibold text-base tracking-wide">
                    {resourceName}
                </div>
            </div>
            <div className="flex-grow float-right flex px-2">
                <div className="ml-auto inline-flex my-auto">
                    {filterTagCodes().map(p =>{
                        return(
                            <TagLink tagType={p} />
                        )
                    })}
                </div>
            </div>
            <Slider active={ShowResourceDetails.show} close={toggleSlider}>
                {resourceCard}
            </Slider>
        </div>
    )
}

export default ResourceLink