import React, { useState, useEffect } from "react";
import {useAuthStore} from "Context/authContext";
import Api from "Helpers/api";
//components
import InputFieldLabel from "Components/Forms/InputFieldLabel";
import Button from "Components/Forms/Button";
import CardTitle from "Components/Profile/CardTitle";
import ButtonToggle from "Components/Forms/ToggleButton";


const api = new Api();
const ProfileCard = ({}) => {
  const authStore = useAuthStore();
  const [userData, setUserType] = useState(
    JSON.parse(authStore.user)
  );
  const userId = userData.pk;

  const [lang, setLanguage] = useState("en");

  const intialBaseValues = { email: userData.email, username:userData.username};
  const [baseFormValues, setBaseFormValues] = useState(intialBaseValues);
  const [baseFormErrors, setBaseFormErrors] = useState({});

  const intialPWValues = { oldPW: "", newPW: "", confirmPW: "" };
  const [pwFormValues, setPWFormValues] = useState(intialPWValues);
  const [pwFormErrors, setPWFormErrors] = useState({});


  const [submitted, setSubmitted] = useState(false);

  const changeLang = (value) => {
    setLanguage(value);
  };

  const handleBaseChange = (e) => {
    console.log("Handle Base Change");
    const { id, value } = e.target;
    setBaseFormValues({ ...baseFormValues, [id]: value });
  };


  const handleChange = (e) => {
    console.log("Handle Change");
    const { id, value } = e.target;
    setPWFormValues({ ...pwFormValues, [id]: value });
  };
  useEffect(() => {
    setPWFormErrors(validatePW(pwFormValues));
  }, [pwFormValues]);

  const validatePW = (values) => {
    let errors = {};
    //only run if any pw field has text
    if (
      values.oldPW.length != 0 ||
      values.newPW.length != 0 ||
      values.oldPW.length != 0
    ) {
      if (values.oldPW.length == 0) {
        errors.oldPW = "Old password must be filled.";
      }
      if (values.newPW.length < 8) {
        errors.newPW = "Password must be more than 8 characters.";
      }
      if (values.newPW != values.confirmPW) {
        errors.confirmPW = "Set password' and 'Confirm password' must match.";
      }
    }
    return errors;
  };


  // useEffect(() => {
  //   profileCallBack();
  // }, []);

const getData = () => {
    console.log("sign in");
    api
      .getUser(userId)
      .then( async (response) => {
        console.log(response.data);
        let arr = JSON.stringify(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };



  //callback for submit order
  

  const pwCallBack = async () => {
    let arrPWerrors = pwFormErrors;
    let arrPW = pwFormValues;
    //first ensure the pw section is set
    if (Object.keys(arrPWerrors).length > 0 || 
    Object.values(arrPW).reduce((total,val) => val==="" ? total+1 : total+0, 0) > 0  ){
      return;
    }
    const pwArr = {old_password:pwFormValues.oldPW, new_password:pwFormValues.newPW}
    await api
      .changePassword(pwArr)
      .then((response) => {
        console.log("e");
      })
      .catch((error) => {
        console.error("Error", error);
      });

  };



  //callback for submit order
  const profileCallBack = () => {
    let arr = baseFormValues;
    api
      .changeProfile(userId, arr)
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.error("Error", error);
      });

  };

  return (
    <>
      <CardTitle name={userData.username} label="User Profile"></CardTitle>
      <form className="relative" >
        <div className="space-y-6">
          <h2 className="text-xl text-betterfit-graphite">Base Profile</h2>
          <ButtonToggle
            option1={{ label: "English", active: lang === "en", value: "en" }}
            option2={{ label: "French", active: lang === "fr", value: "fr" }}
            value={lang}
            changeValue={changeLang}
          ></ButtonToggle>

          <InputFieldLabel
            id_tag="username"
            name="Name"
            type="text"
            value={baseFormValues.username}
            onChange={handleBaseChange}
          ></InputFieldLabel>
          <InputFieldLabel
            id_tag="email"
            name="email"
            type="email"
            value={baseFormValues.email}
            onChange={handleBaseChange}
          ></InputFieldLabel>
        </div>
        <div className="space-y-6 pb-4">
          <h2 className="text-xl text-betterfit-graphite pt-6">
            Change Password
          </h2>
          <InputFieldLabel
            id_tag="oldPW"
            name="Old Password"
            value={pwFormValues.oldPW}
            onChange={handleChange}
            error = {pwFormErrors.oldPW}
            required={false}
          ></InputFieldLabel>
          <InputFieldLabel
            id_tag="newPW"
            name="New Password"
            onChange={handleChange}
            value={pwFormValues.newPW}
            error = {pwFormErrors.newPW}
            required={false}
          ></InputFieldLabel>
          <InputFieldLabel
            name="Confirm Password"
            id_tag="confirmPW"
            onChange={handleChange}
            value={pwFormValues.confirmPW}
            error = {pwFormErrors.confirmPW}
            required={false}
          ></InputFieldLabel>
        </div>
        <Button
          text="Save Profile"
          color=" bg-betterfit-green"
          hoverColor="bg-green-800"
          text_size="text-sm"
          onClick={(e) => {
            e.preventDefault();
            profileCallBack();
          }}
        ></Button>
      </form>
    </>
  );
};

export default ProfileCard;
