import CardTitle from "Components/Profile/CardTitle";
//components
import FacilityDescriptions from "Components/Profile/FacilityDescription";
import { useAuthStore } from "Context/authContext";
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
import React, { useEffect, useState } from "react";

const FacilityCard = () => {
  const api = new Api();
  const authStore = useAuthStore();
  const [userData] = useState(JSON.parse(authStore.user));
  const [facilityData, setFacility] = useState();
  const facilityName = userData.user_profile.facility_name;
  const facilityId = userData.user_profile.facility;

  //TODO =fix once api complete
  const setData = (data) => {
    return {
      //contact: ["123-123-1234", "email@testemail.com"],
      address: [data.street, data.city + " " + data.province, data.postal_code],
      //shipping_address: [
      // data.shipping_street,
      //  data.shipping_city + " " + data.shipping_province,
      //  data.shipping_postal_code,
      //  ],
      shipping_address: [
        data.street,
        data.city + " " + data.province,
        data.postal_code,
      ],
    };
  };

  const getData = async () => {
    api
      .getFacilityData(facilityId)
      .then(async (response) => {
        let data = setData(response.data);
        setFacility(data);
      })
      .catch((err) => {
        //delete when api is working
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {facilityData && (
        <>
          <CardTitle
            label={Translator("Facility Profile")}
            name={facilityName}
          ></CardTitle>

          <div className="space-y-6">
            <FacilityDescriptions
              label={Translator("Address")}
              items={facilityData.address}
            ></FacilityDescriptions>
            <FacilityDescriptions
              label={Translator("Shipping Address")}
              items={facilityData.shipping_address}
            ></FacilityDescriptions>
          </div>
        </>
      )}
    </>
  );
};

export default FacilityCard;
