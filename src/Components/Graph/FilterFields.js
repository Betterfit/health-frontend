import Collapsible from './Collapsible';
import React, {useState} from 'react';

const FilterFields = ({filterData, onClickEvent}) => {
        return (
          <div className="h-16 flex flex-wrap justify-start items-start pr-4">
            {filterData.map(field => {
              return (
                <Collapsible 
                  heading={field.heading}
                  children={field.content}
                  onClickEvent={onClickEvent}
                />
              )
              })}
            </div>
        )
}

export default FilterFields;