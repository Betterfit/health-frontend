import { Transition } from "@tailwindui/react";
import React, { useState, useEffect } from "react";
import useStores from "Helpers/useStores";

//components
import InputFieldLabel from "Components/Forms/InputFieldLabel";
import Button from "Components/Forms/Button";
import CardTitle from "Components/Profile/CardTitle";
import ButtonToggle from "Components/Forms/ToggleButton";

const ProfileCard = ({}) => {
  const { store } = useStores();
  const [userData, setUserType] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.username);
  const [lang, setLanguage] = useState("en");
  const [fixedName, setFixedName] = useState(userData.username);


  function updateInfo() {
    //update with api when ready
    console.log("updating");
  };

  return (
    <>
      <CardTitle name={fixedName} label="User Profile"></CardTitle>
      <form className="relative" onSubmit={updateInfo}>
        <div className="space-y-6">
          <h2 className="text-xl text-betterfit-graphite">Base Profile</h2>
          {lang}
          <ButtonToggle
            option1={{ label: "English", active: lang === "en", value:"en" }}
            option2={{ label: "French", active: lang === "fr", value:"fr" }}
            value={lang}
            callback ={(value) => {
              setLanguage(value);
            }}
          ></ButtonToggle>

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
