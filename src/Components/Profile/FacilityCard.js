import { Transition } from "@tailwindui/react";
import React, { useState, useEffect } from "react";
import useStores from "Helpers/useStores";
import Api from "Helpers/api";

//components
import FacilityDescriptions from "Components/Profile/FacilityDescription";
import CardTitle from "Components/Profile/CardTitle";

const FacilityCard = ({}) => {
  const api = new Api();
  const { store } = useStores();
  const [userData, setUserType] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [facilityData, setFacility] = useState();
  const facilityName = userData.user_profile.facility_name;
  const facilityId = userData.user_profile.facility;

  const setData = (data) => {
    return {
      contact: ["123-123-1234", "email@testemail.com"],
      address: [data.street, data.city + " " + data.province, data.postal_code],
      shipping_address: [
        data.shipping_street,
        data.shipping_city + " " + data.shipping_province,
        data.shipping_postal_code,
      ],
      units: ["Emergency", "Cardiology", "Urology", "Oncology"],
    };
  };

  //testdata -  delete when api is ready
  let testdata = {
    name: "Royal Crom Hospital",
    pk: 1,
    region: "Western Canada",
    street: "10139 81 Ave NW",
    city: "Edmonton",
    province: "AB",
    postal_code: "T8N6V7",
    shipping_street: "10139 81 Ave NW",
    shipping_city: "Edmonton",
    shipping_province: "AB",
    shipping_postal_code: "T8N6V7",
  };

  const getData = async () => {
    api
      .getFacilityData(facilityId)
      .then(async (response) => {
        //let data = setData(response.data)
        let data = setData(testdata);
        setFacility(data);
      })
      .catch((err) => {
        //delete when api is working
        let data = setData(testdata);
        setFacility(data);
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("getting data");
    getData();
  }, []);

  return (
    <>
      {facilityData && (
        <>
          <CardTitle label="Facility Profile" name={facilityName}></CardTitle>

          <div className="space-y-6">
            <FacilityDescriptions
              label="Contact Information"
              items={facilityData.contact}
            ></FacilityDescriptions>
            <FacilityDescriptions
              label="Address"
              items={facilityData.address}
            ></FacilityDescriptions>
            <FacilityDescriptions
              label="Shipping Address"
              items={facilityData.shipping_address}
            ></FacilityDescriptions>
            <FacilityDescriptions
              label="Units Accessible"
              items={facilityData.units}
            ></FacilityDescriptions>
          </div>
        </>
      )}
    </>
  );
};

export default FacilityCard;
