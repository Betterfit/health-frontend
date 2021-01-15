import Button from "Components/Forms/Button";
import InputFieldLabel from "Components/Forms/InputFieldLabel";
import ButtonToggle from "Components/Forms/ToggleButton";
import Notification from "Components/Helpers/Notifications";
import CardTitle from "Components/Profile/CardTitle";
import { useAuthStore } from "Context/authContext";
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";


const ProfileCard = () => {
  const api = new Api();
  //NOTE - this is not getting or saving lang to user data yet
  //ONLY saving local.
  const authStore = useAuthStore();
  const [userData, setUserType] = useState(JSON.parse(authStore.user));
  const language = authStore.language;
  let userName = userData.username;
  const userId = userData.pk;

  const intialBaseValues = {
    email: userData.email,
    username: userData.username,
    lang: language,
  };

  const [baseFormValues, setBaseFormValues] = useState(intialBaseValues);

  const intialPWValues = { oldPW: "", newPW: "", confirmPW: "" };
  const [pwFormValues, setPWFormValues] = useState(intialPWValues);
  const [pwFormErrors, setPWFormErrors] = useState({});

  const [pwNotification, setPWNotification] = useState();
  const [baseNotification, setBaseNotification] = useState();

  const changeLang = (value) => {
    localStorage.setItem("language", value);
    authStore.language = value;
  };

  //Base section form changes
  const handleBaseChange = (e) => {
    const { id, value } = e.target;
    if (id === "lang") {
      changeLang(value);
    }
    //clear any errors on input
    setBaseNotification();
    setBaseFormValues({ ...baseFormValues, [id]: value });
  };

  //PW section form changes
  const handlePWChange = (e) => {
    const { id, value } = e.target;
    //clear any errors on input
    setPWNotification();
    setPWFormValues({ ...pwFormValues, [id]: value });
  };

  useEffect(() => {
    setPWFormErrors(validatePW(pwFormValues));
  }, [pwFormValues]);

  //Validate PW changes
  const validatePW = (values) => {
    let errors = {};
    //only run if any pw field has text
    if (
      values.oldPW.length !== 0 ||
      values.newPW.length !== 0 ||
      values.oldPW.length !== 0
    ) {
      if (values.oldPW.length === 0) {
        errors.oldPW = "Old password must be filled.";
      }
      if (values.newPW.length < 8) {
        errors.newPW = "Password must be more than 8 characters.";
      }
      if (values.newPW !== values.confirmPW) {
        errors.confirmPW = "'Set password' and 'Confirm password' must match.";
      }
    }
    return errors;
  };

  //get user data and reset the local storage with update info
  const getUserData = () => {
    api
      .getUser(userId)
      .then(async (response) => {
        let arr = JSON.stringify(response.data);
        authStore.user = JSON.stringify(arr);
        localStorage.setItem("user", arr);
        setUserType(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //callback for submit order
  const pwCallBack = async () => {
    let arrPWerrors = pwFormErrors;
    let arrPW = pwFormValues;

    //first ensure the pw section is set properly
    if (
      Object.keys(arrPWerrors).length > 0 ||
      Object.values(arrPW).reduce(
        (total, val) => (val === "" ? total + 1 : total + 0),
        0
      ) > 0
    ) {
      return;
    }
    const pwArr = {
      old_password: pwFormValues.oldPW,
      new_password: pwFormValues.newPW,
    };
    await api
      .changePassword(pwArr)
      .then((response) => {
        //update user token
        let token = response.data.data.token;
        localStorage.setItem("token", token);
        authStore.token = token;
        setPWNotification({
          head: "Success",
          text: "Your password has been updated",
          value: true,
        });
      })
      .catch((error) => {
        setPWNotification({
          head: "Error",
          text:
            "There was an error updating your password. Please ensure you are entering your old password correctly.",
          value: false,
        });
        console.error("Error", error);
      });
  };

  //callback for update baseprofile
  const profileCallBack = () => {
    let arr = baseFormValues;

    //Only call if initial form values have changed
    if (isEqual(intialBaseValues, arr)) {
      return;
    }
    api
      .changeProfile(userId, arr)
      .then((response) => {
        //update localstorage with updated userdata
        getUserData();
        setBaseNotification({
          head: "Success",
          text: "Profile has been updated",
          value: true,
        });
      })
      .catch((error) => {
        setBaseNotification({
          head: "Error",
          text: "There was an error updating your profile.",
          value: false,
        });
        console.error("Error", error);
      });
  };

  //general callback for entire form
  //broken into two api calls
  // one for base profile
  // one for pw
  const callBack = () => {
    profileCallBack();
    pwCallBack();
  };

  return (
    <>
      <CardTitle name={userName} label="User Profile"></CardTitle>
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault();
          callBack();
        }}
      >
        <div className="space-y-6">
          <h2 className="text-xl text-betterfit-graphite">
            {Translator("Base Profile")}
          </h2>
          <ButtonToggle
            option1={{
              label: "English",
              active: baseFormValues.lang === "en",
              value: "en",
            }}
            option2={{
              label: "French",
              active: baseFormValues.lang === "fr",
              value: "fr",
            }}
            changeValue={handleBaseChange}
            id="lang"
            name="Default Language"
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
            {Translator("Change Password")}
          </h2>
          <InputFieldLabel
            id_tag="oldPW"
            name="Old Password"
            value={pwFormValues.oldPW}
            onChange={handlePWChange}
            error={pwFormErrors.oldPW}
            required={false}
            type="password"
          ></InputFieldLabel>
          <InputFieldLabel
            id_tag="newPW"
            name="New Password"
            onChange={handlePWChange}
            value={pwFormValues.newPW}
            error={pwFormErrors.newPW}
            required={false}
            type="password"
          ></InputFieldLabel>
          <InputFieldLabel
            name="Confirm Password"
            id_tag="confirmPW"
            onChange={handlePWChange}
            value={pwFormValues.confirmPW}
            error={pwFormErrors.confirmPW}
            required={false}
            type="password"
          ></InputFieldLabel>
        </div>
        {baseNotification && (
          <Notification
            head={baseNotification.head}
            text={baseNotification.text}
            success={baseNotification.value}
          ></Notification>
        )}
        {pwNotification && (
          <Notification
            head={pwNotification.head}
            text={pwNotification.text}
            success={pwNotification.value}
          ></Notification>
        )}
        <Button
          text="Save Profile"
          color=" bg-betterfit-green"
          hoverColor="bg-green-900"
          text_size="text-sm"
        ></Button>
      </form>
    </>
  );
};

export default ProfileCard;
