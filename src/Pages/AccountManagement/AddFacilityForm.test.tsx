import { render } from "@testing-library/react";
import React from "react";
import { Facility } from "Types";
import AddFacilityForm from "./AddFacilityForm";

const dummyFacility: Facility = {
  name: "Carl Hill Regional Hospital",
  id: 38,
  pk: 38,
  phoneNumber: "T5J3X4",
  street: "123 97 St NW",
  city: "Edmonton",
  province: "AB",
  postalCode: "t5j3x4",
  shippingStreet: "123 97 St NW",
  shippingCity: "Edmonton",
  shippingProvince: "AB",
  shippingPostalCode: "t5j3x4",
  parentOrganization: "http://localhost:8002/organizations/1",
  url: "http://localhost:8002/facilities/38",
  isAdmin: true,
  isMember: false,
};

describe("AddFacilityForm", () => {
  let closeMock = jest.fn();
  beforeEach(() => {
    closeMock = jest.fn();
  });
  it("Properly displays existing facilities", () => {
    render(
      <AddFacilityForm
        handleClose={closeMock!}
        existingFacility={dummyFacility}
      />
    );
  });
});
