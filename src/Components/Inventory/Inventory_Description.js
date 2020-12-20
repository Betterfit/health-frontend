import Translator from "Helpers/Translator";
import React from "react";

function InventoryDescription({ title, description, class_addons }) {
  let standard_dt_styles = `uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 ${class_addons}`;
  return (
    <dl>
      <dt
        className={`${standard_dt_styles} font-semibold text-10 tracking-extra-wide text-gray-600 opacity-50`}
      >
        {Translator(title)}
      </dt>
      <dd className="text-betterfit-grey-blue text-base leading-6 pb-3">
        {description}
      </dd>
    </dl>
  );
}

export default InventoryDescription;
