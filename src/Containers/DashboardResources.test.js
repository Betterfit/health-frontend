import * as rtl from "@testing-library/react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { apiURL } from "Helpers/api";
import { render, rest, server } from "Helpers/testUtils";
import React from "react";
import DashboardResources from "./DashboardResources";

const resources = [
  {
    pk: 2,
    resource_type: "lab",
    title: "BCCDC Public Health Labratory",
    tags: [
      {
        pk: 2,
        title: "Gowns",
        main_color: "#258c66",
        background_color: "#e9f9f0",
      },
      {
        pk: 1,
        title: "Masks",
        main_color: "#258c66",
        background_color: "#e9f9f0",
      },
    ],
    details: {
      biosafety_level: 3,
      email: "admininfo@bccdc.ca",
      phone_number: "(604)707-2400",
      street: "2655 West 12th Avenue",
      city: "Vancouver",
      province: "British Columbia",
      postal_code: "V5Z 4R4",
      website: "http://www.bccdc.ca",
    },
  },
  {
    pk: 302,
    resource_type: "supplier",
    title: "Logistik Unicorp",
    tags: [
      {
        pk: 2,
        title: "Gowns",
        main_color: "#258c66",
        background_color: "#e9f9f0",
      },
    ],
    details: {
      healthcare_default: "No",
      phone_number: "888-326-8688 or 450-349-9700",
      email: "info@promedikal.com",
      street: "820 Chemin du Grand Bernier N",
      city: "Saint-Jean-sur-Richelieu",
      province: "Québec",
      postal_code: "J2W 0A6",
      fax: "J2W 0A6",
      website: "https://promedikal.com/?Language=en",
    },
  },
];

describe("DashboardResources", () => {
  beforeEach(() => {
    server.use(
      rest.get(apiURL + "resources", (req, res, ctx) =>
        res(ctx.json(resources))
      )
    );
    render(<DashboardResources />);
  });

  it("Has a searchbar with the correct placeholder text", () => {
    const searchbar = screen.getByRole("textbox", {
      name: /Search Resources/i,
    });
    expect(searchbar).toBeInTheDocument();
  });

  it("Loads all returned resources", async () => {
    const resourceList = await screen.findByRole("list", {
      name: /resource list/i,
    });
    for (const resource of resources) {
      expect(
        await rtl.findByRole(resourceList, "listitem", {
          name: resource.title,
        })
      ).toBeInTheDocument();
    }
  });

  it("Has the correct clickable tags", async () => {
    const tagListEl = screen.getByRole("list", { name: /Tag List/i });
    const visibleTags = await rtl.findAllByRole(tagListEl, "button");
    expect(visibleTags.length).toEqual(2);
    expect(
      rtl.getByRole(tagListEl, "button", { name: /Gowns/i })
    ).toBeInTheDocument();
    expect(
      rtl.getByRole(tagListEl, "button", { name: /Masks/i })
    ).toBeInTheDocument();
  });

  it("Correctly filters resources when a tag is selected", async () => {
    const tagListEl = screen.getByRole("list", { name: /Tag List/i });
    // click on the gown tag
    const maskTag = await rtl.findByRole(tagListEl, "button", {
      name: /mask/i,
    });
    userEvent.click(maskTag);
    // Only BCCDC Public Health should be left
    const resList = screen.getByRole("list", {
      name: /Resource List/i,
    });
    const resLinks = rtl.getAllByRole(resList, "listitem");
    expect(resLinks).toHaveLength(1);
    expect(
      rtl.getByRole(resList, "listitem", {
        name: /BCCDC Public Health Labratory/i,
      })
    ).toBeInTheDocument();
  });

  it("Correctly filters resources when multiple tags are selected", async () => {
    const tagListEl = screen.getByRole("list", { name: /Tag List/i });
    // click on both tags, which should make 2 resources appear
    const maskTag = await rtl.findByRole(tagListEl, "button", {
      name: /mask/i,
    });
    const gownTag = rtl.getByRole(tagListEl, "button", { name: /gown/i });
    userEvent.click(gownTag);
    userEvent.click(maskTag);
    const resList = screen.getByRole("list", {
      name: /Resource List/i,
    });
    const resLinks = rtl.getAllByRole(resList, "listitem");
    expect(resLinks).toHaveLength(2);
  });

  it("Allows users to deselect tags", async () => {
    const tagListEl = await screen.findByRole("list", { name: /Tag List/i });
    let maskTag = await rtl.findByRole(tagListEl, "button", { name: /mask/i });
    // select then deselect the mask tag
    userEvent.click(maskTag);
    maskTag = rtl.getByRole(tagListEl, "button", { name: /mask/i });
    userEvent.click(maskTag);
    // all resources should be visible still, since no tags are selected
    const resList = screen.getByRole("list", {
      name: /Resource List/i,
    });
    const resLinks = rtl.getAllByRole(resList, "listitem");
    expect(resLinks).toHaveLength(2);
  });

  it("Has a list of resource types", async () => {
    const resTypes = await screen.findByRole("list", {
      name: /Resource Types/i,
    });
    expect(rtl.getAllByRole(resTypes, "button").length).toEqual(5);
    expect(rtl.getByRole(resTypes, "button", { name: /lab/i }));
    expect(rtl.getByRole(resTypes, "button", { name: /regulation/i }));
  });

  it("Filters the resources when a type is selected", async () => {
    const resTypes = screen.getByRole("list", {
      name: /Resource Types/i,
    });
    // find and click the supplier button to filter out non-facility resources
    const supplierButton = rtl.getByRole(resTypes, "button", {
      name: /supplier/i,
    });
    userEvent.click(supplierButton);
    // the new list of resources should only have 1 element
    const resList = await screen.findByRole("list", {
      name: /Resource List/i,
    });
    const resLinks = rtl.getAllByRole(resList, "listitem");
    expect(resLinks).toHaveLength(1);
    expect(
      rtl.getByRole(resList, "listitem", {
        name: /Logistik Unicorp/i,
      })
    ).toBeInTheDocument();
  });
});
