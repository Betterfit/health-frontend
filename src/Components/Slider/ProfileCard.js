import { Transition } from "@tailwindui/react";
import React, { useState, useEffect } from "react";

import { ReactSVG } from "react-svg";
// images
import Close from "Images/Icons/close.svg";
//components
import InputFieldLabel from "Components/Forms/InputFieldLabel";
import Button from "Components/Forms/Button";

const ProfileCard = ({ language = "en" }) => {
  const [lang, setLang] = useState(language);
  const setLanguage = (lang) => {
    return lang === "en" ? true : false;
  };
  const [active, setActive] = useState(setLanguage(lang));
  const toggle = () => {
    setActive(!active);
  };
  useEffect(() => {
    setLang(active ? "en" : "fr");
    console.log(language);
  }, [active]);

  return (
    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <Transition
            show={true}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div class="w-screen max-w-md">
              <div class="h-screen flex flex-col mt-3 mr-2 space-y-6 py-6 bg-white shadow-xl overflow-y-scroll rounded-lg m-3">
                <div class="absolute w-12 h-12 mt-3 mr-2 left-0 top-0 border cursor-pointer shadow-lg bg-white z-10 rounded-full flex">
                  <ReactSVG
                    src={Close}
                    onClick="#"
                    className="flex  m-auto"
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width:16px;height:16px");
                    }}
                  />
                </div>
                <header class="px-4 sm:px-6">
                  <div class="flex items-start justify-between space-x-3">
                    <h2 class="text-lg leading-7 font-medium text-gray-900">
                      Panel title
                    </h2>
                    <div class="h-7 flex items-center"></div>
                  </div>
                </header>
                <div class="relative flex-1 px-4 sm:px-6">
                  <div class="absolute inset-0 px-4 sm:px-6">
                    <div className="space-y-6">
                      <h2 className="text-xl text-betterfit-graphite pt-6">
                        Base Profile
                      </h2>
                      <div class="text-base leading-none border-2 border-gray-200 rounded flex">
                        <button
                          class={
                            "flex items-center flex-grow py-3 m-1 justify-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded px-4 py-2 " +
                            (active
                              ? " pointer-events-none active bg-betterfit-basic-blue text-white"
                              : "bg-white text-betterfit-navy'")
                          }
                          id="grid"
                          onClick={toggle}
                        >
                          <span>English</span>
                        </button>
                        <button
                          class={
                            "flex items-center flex-grow justify-center py-3 m-1 transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded px-4 py-2" +
                            (active
                              ? "bg-white"
                              : " pointer-events-none active bg-betterfit-basic-blue text-white text-betterfit-navy'")
                          }
                          id="list"
                          onClick={toggle}
                        >
                          <span>French</span>
                        </button>
                      </div>

                      <InputFieldLabel
                        id_tag="Name"
                        name="Name"
                        type="text"
                      ></InputFieldLabel>
                      <InputFieldLabel
                        id_tag="email"
                        name="email"
                        type="email"
                      ></InputFieldLabel>
                    </div>
                    <div className="space-y-6 pb-4">
                      <h2 className="text-xl text-betterfit-graphite pt-6">
                        Change Password
                      </h2>
                      <InputFieldLabel
                        id_tag="Old Password"
                        name="Old Password"
                        type="password"
                      ></InputFieldLabel>
                      <InputFieldLabel
                        id_tag="New Password"
                        name="New Password"
                        type="password"
                      ></InputFieldLabel>
                      <InputFieldLabel
                        id_tag="Confirm Password"
                        name="Confirm Password"
                        type="password"
                      ></InputFieldLabel>
                    </div>
                    <Button
                      text="Save Profile"
                      color=" bg-betterfit-green"
                      hoverColor="bg-green-800"
                      text_size="text-sm"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </section>
      </div>
    </div>
  );
};

export default ProfileCard;
