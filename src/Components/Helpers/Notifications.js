import Translator from "Helpers/Translator";
import critical from "Images/Icons/critical.svg";
import thumbsup from "Images/Icons/thumbs-up.svg";
import React from "react";
import { ReactSVG } from "react-svg";

const SuccessSVG = () => {
  return (
    <ReactSVG
      src={thumbsup}
      className="mt-.5"
      beforeInjection={(svg) => {
        svg.setAttribute("style", "width: 15px;fill:#235340");
      }}
    />
  );
};

const FailSVG = () => {
  return (
    <ReactSVG
      src={critical}
      className="mt-.5"
      beforeInjection={(svg) => {
        svg.setAttribute("style", "width: 15px;");
      }}
    />
  );
};

const Notification = ({ head, text, success = false }) => {
  let css_bg = success ? "bg-tag-light-green" : "bg-status-red ";
  let css_text = success ? "text-tag-light-green-txt" : "text-status-dark-red";
  let image = success ? <SuccessSVG /> : <FailSVG />;
  return (
    <div className={`${css_bg} rounded flex flex-row p-2 items-start my-1`}>
      {image}
      <p className={`text-xs leading-5 ${css_text} `}>
        <span className="font-bold ml-2 mr-2">{Translator(head)} </span>
        {Translator(text)}
      </p>
    </div>
  );
};
export default Notification;
