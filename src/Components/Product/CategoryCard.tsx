import { setProductNavInfo } from "Containers/Facility/Inner/ProductList";
import Translator from "Helpers/Translator";
import RightArrow from "Images/Icons/right-arrow.svg";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ProductCategory } from "Types";

const CategoryCard = ({ category }: { category: ProductCategory }) => {
  const history = useHistory();
  return (
    <>
      <button
        className="col-span-1 mb-2 p-6 relative flex flex-row md:flex-col justify-content items-center rounded-lg border border-betterfit-grey hover:bg-betterfit-pale-blue hover:border-betterfit-basic-blue focus-visible:shadow-none"
        onClick={() => setProductNavInfo(history, { categoryId: category.id })}
      >
        <div
          className="rounded-full h-18 w-18 flex items-center "
          style={{ background: "#e4efffc" }}
        >
          <img className="m-auto" src={category.icon} alt="" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-betterfit-graphite md:text-center text-base leading-tight md:pt-4">
            {Translator(category.name)}
          </p>
          <p className="text-xxs uppercase text-gray-700 md:text-center leading-tight pt-2 font-semibold">
            {category.count + " product" + (category.count > 1 ? "s" : "")}
          </p>
        </div>
        <ReactSVG
          src={RightArrow}
          className=" opacity-50 ml-auto md:hidden"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "height:25px;");
          }}
        />
      </button>
    </>
  );
};
export default CategoryCard;
