import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import TagLink from 'Components/Content/TagLink';
import Slider from "Components/Slider/Slider";
import SupplierCard from "Components/ResourceProfile/SupplierCard";
import ResearchCard from "Components/ResourceProfile/ResearchCard";
import LabCard from "Components/ResourceProfile/LabCard";
import FacilityCard from "Components/ResourceProfile/FacilityCard";

const ResourceLink = ({resourceColor, resourceType, resourceName, tagList, resourceDetails, resourceCode}) => {
   const resourceCard = (function(resourceCode) {
    switch (resourceCode) {
        case 'facility':
            return <FacilityCard name={resourceName} tagList={tagList} details={resourceDetails} color={resourceColor}/>;
        case 'lab':
            return <LabCard name={resourceName} tagList={tagList} details={resourceDetails} color={resourceColor}/>;
        case 'research':
            return <ResearchCard name={resourceName} tagList={tagList} details={resourceDetails} color={resourceColor}/>;
        case 'supplier':
            return <SupplierCard name={resourceName} tagList={tagList} details={resourceDetails} color={resourceColor}/>;
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
            <div className="w-1 rounded-md mr-2" style={{backgroundColor: resourceColor}} />
            <button className="p-2 text-left">
                <div className="font-medium text-gray-700 font-body uppercase tracking-widest text-xs">
                    {resourceType}
                </div>
                <div className="font-semibold text-base tracking-wide">
                    {resourceName}
                </div>
            </button>
            <div className="flex-grow float-right flex px-2 flex-shrink-0">
                <div className="ml-auto inline-flex my-auto">
                    {tagList.map(tag => 
                        <TagLink tag={tag} key={'tag'+tag.pk}/>
                    )}
                </div>
            </div>
            <Slider active={ShowResourceDetails.show} close={toggleSlider}>
                {resourceCard}
            </Slider>
        </div>
    )
}

export default ResourceLink