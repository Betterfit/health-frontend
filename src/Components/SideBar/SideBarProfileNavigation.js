import Translator from "Helpers/Translator";
import React from "react";

const SideBarProfileNavigation = ({ close }) => {
  return (
    <>
      <div
        className={`cursor-pointer rounded-lg space-y-4 absolute top-0 px-4 py-4 z-0  flex flex-col bg-white text-14 text-betterfit-graphite
    md:w-4/5 transform md:-translate-y-full md:m-0 md:right-auto
    w-64 right-0 mr-6 `}
        onMouseLeave={close}
      >
        <a href="/logout">
          <span className="my-2">{Translator("Logout")}</span>
        </a>
      </div>
    </>
  );
};

export default SideBarProfileNavigation;
