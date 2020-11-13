import React from "react";


function Inventory_Description({ title, description, class_addons }) {
  let standard_dt_styles = `uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 ${class_addons}`;
  return (
    <>
      <dt className={standard_dt_styles}>{title}</dt>
      <dd className="text-gray-700 text-base leading-6 pb-3">{description}</dd>
    </>
  );
}

export default Inventory_Description;
