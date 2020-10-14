import React, { useState } from "react";
import CircleButton from "Components/Forms/CircleButton";
import FlatButton from "Components/Forms/FlatDetailButton";
import EmptyImage from "Images/emptyImage.png";




const CategoryCard = ({ product, category }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <div
        className="mb-2 p-6 rounded relative flex flex-col justify-content rounded-lg border border-betterfit-light-blue" >
        <p className ="text-semibold text-betterfit-graphite text-center">Masks</p>
        <p className = "text-xxs uppercase opacity-50 text-betterfit-basic-blue text-center">5 products</p>
      </div>
    </>
  );
};
export default CategoryCard;
