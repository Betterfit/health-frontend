import { Transition } from "@tailwindui/react";
import React, { useState, useEffect } from "react";
import useStores from "Helpers/useStores";

//components
import InputFieldLabel from "Components/Forms/InputFieldLabel";
import Button from "Components/Forms/Button";
import CardTitle from "Components/Profile/CardTitle";

const ProfileCard = ({}) => {
  const { store } = useStores();
  const [userData, setUserType] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.username);
  const fixedName = useState(userData.username);

  const setLanguage = (lang) => {
    return lang === "en" ? true : false;
  };

  const [lang, setLang] = useState("en");
  const [active, setActive] = useState(setLanguage(lang));

  const toggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    setLang(active ? "en" : "fr");
  }, [active]);

  const confirmCallBack = () => {
    // api.setProfile(lang, ticketDataRaw.pk,obj).then((response)=>{
    //     getData();
    // }).catch(error => {
    //     console.error('Error', error);
    // });
  };

  return (
    <>
      <CardTitle name={name} label="User Profile"></CardTitle>
      <form className="relative">
        <div className="space-y-6">
          <h2 className="text-xl text-betterfit-graphite">Base Profile</h2>
          <div className="text-base leading-none border-2 border-gray-200 rounded flex">
            <button
              className={
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
              className={
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></InputFieldLabel>
          <InputFieldLabel
            id_tag="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
      </form>
    </>
  );
};

export default ProfileCard;
