import React from "react";
import Inventory from "./Inventory";


function Inventory_Description_Only(props) {
  const description = props.description;
  return (
    <dd className="text-gray-700 text-base leading-6 pb-3">{description}</dd>
  );
}

function Inventory_Edit(props) {
  const description = props.description;
  return (
    <input
      type="number"
      className="py-2 pl-4 form-input block w-1/3 md:w-3/4 text-base border-gray-400 border rounded"
      defaultValue={description}
    />
  );
}

function Inventory_Description({ title, description, class_addons, edit }) {
  let description_type;
  let standard_dt_styles = `uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 ${class_addons}`;
  if (edit) {
    description_type = <Inventory_Edit description={description} />;
  } else {
    description_type = <Inventory_Description_Only description={description} />;
  }

  return (
    <>
      <dt className={standard_dt_styles}>{title}</dt>
      {description_type}
    </>
  );
}

export default Inventory_Description;
