import React from 'react';
import {NavLink} from "react-router-dom";
import TagLink from 'Components/Content/TagLink';
const ResourceLink = ({resourceColor, resourceType, resourceName, tagList}) => {
    return(
        <div className="flex p-1">
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
                    {tagList.map(p =>{
                        return(
                            <TagLink tagType={p} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ResourceLink