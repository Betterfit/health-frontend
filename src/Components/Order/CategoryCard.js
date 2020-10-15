import React, { useState } from "react";
import CircleButton from "Components/Forms/CircleButton";
import FlatButton from "Components/Forms/FlatDetailButton";
import EmptyImage from "Images/emptyImage.png";
import { ReactSVG } from "react-svg";
import RightArrow from "Images/Icons/right-arrow.svg";

const CategoryCard = (category) => {
  const getProductCount = (products) => {
    let sum = 0;
    products.forEach((val) => {
        //if there are no product_variations, then 1 for the product
      sum += (val.product_variations.length>0 ? val.product_variations.length : 1);
    });
    return sum;
  };

  const category_name = category.category.name;
  const count = getProductCount(category.category.products);

  //TODO - pull out svg into circle below once included in api
  //    const backgroundColor = {
  //     background: category.icon.backgroundcolor;
  //  }
  //const color = category.icon.color
  //const svg = category.icon.svg;
  //const category_name = category.name;
  //const count = category.count;
  const backgroundColor = {
    background: "#FBEDDE",
  };

  return (
    <>
      <div className="mb-2 p-6 rounded relative flex flex-row md:flex-col justify-content items-center rounded-lg border border-betterfit-light-blue">
        <div
          className="rounded-full h-18 w-18 flex items-center mr-2 "
          style={backgroundColor}
        ></div>
        <div className="flex flex-col">
          <p className="font-semibold text-betterfit-graphite md:text-center text-base leading-tight md:pt-4">
            {category_name}
          </p>
          <p className="text-xxs uppercase opacity-50 text-betterfit-basic-blue md:text-center leading-tight pt-2">
            {count + " product" + (count > 1 ? "s" : "")}
          </p>
        </div>
        <ReactSVG
          src={RightArrow}
          className=" opacity-50 ml-auto md:hidden"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "height:25px;");
          }}
        />
      </div>
    </>
  );
};
export default CategoryCard;
