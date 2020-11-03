import Collapsible from './Collapsible';
import React, {useState} from 'react';

const FilterFields = ({filterData, onClickEvent}) => {
        return (
          <div className="flex flex-wrap justify-start items-start">
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