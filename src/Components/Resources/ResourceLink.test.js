import * as rtl from "@testing-library/react";
import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ResourceLink from "./ResourceLink";

const tags = [
  {
    pk: 6,
    title: "Clinical Trials",
    main_color: "#FFFFFF",
    background_color: "#0000EE",
  },
  {
    pk: 7,
    title: "Diversity and Social Impacts",
    main_color: "#FFFFFF",
    background_color: "#0000EE",
  },
];

const resources = [
  {
    pk: 1,
    resource_type: "facility",
    title: "Royal Crom Hospital",
    tags: [tags[0], tags[1]],
    details: {
      phone_number: "555-555-5555",
      email: "crom@crom.com",
      street: "10139 81 Ave NW",
      city: "Edmonton",
      province: "AB",
      postal_code: "T8N6V7",
      shipping_street: "10139 81 Ave NW",
      shipping_city: "Edmonton",
      shipping_province: "AB",
      shipping_postal_code: "T8N6V7",
      fax: "T8N6V7",
      website: "www.dkfgb.com",
    },
  },
];
describe("Resource Link", () => {
  it("Renders a resource", () => {
    render(<ResourceLink resource={resources[0]} color="red" />);
  });

  it("Shows all tags", () => {
    render(<ResourceLink resource={resources[0]} color="red" />);
    // each tag should be visible on the resource link
    for (let tag of resources[0].tags) {
      expect(screen.getByText(tag.title)).toBeInTheDocument();
    }
  });

  it("Opens card when clicked", async () => {
    const resource = resources[0];
    render(<ResourceLink resource={resource} color="red" />);
    const link = screen.getByRole("listitem", { name: /royal crom/i });
    userEvent.click(link);
    const resourceCard = await screen.findByRole("dialog");
    // the facility card shouldn't be empty
    expect(getByText(resourceCard, /royal crom/i)).toBeInTheDocument();
    expect(getByText(resourceCard, /facility/i)).toBeInTheDocument();
  });

  it("Allows users to copy email addresses, phone numbers and addresses", async () => {
    const resource = resources[0];
    render(<ResourceLink resource={resource} color="red" />);
    const link = screen.getByRole("listitem", { name: /royal crom/i });
    userEvent.click(link);
    const resourceCard = await screen.findByRole("dialog");
    rtl.getByRole(resourceCard, "button", {
      name: /copy email/i,
    });
    rtl.getByRole(resourceCard, "button", {
      name: /copy phone/i,
    });
    rtl.getByRole(resourceCard, "button", {
      name: /copy address/i,
    });
    // its a bit tricky to test the clipboard value after clicking, so that's omitted
  });

  it("Allows users to click emails to trigger email sending", async () => {
    const resource = resources[0];
    render(<ResourceLink resource={resource} color="red" />);
    const link = screen.getByRole("listitem", { name: /royal crom/i });
    userEvent.click(link);
    const resourceCard = await screen.findByRole("dialog");
    const emailLink = rtl.getByText(resourceCard, resource.details.email);
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:" + resource.details.email
    );
  });

  it("Includes a link to google maps in the address field", async () => {
    const resource = resources[0];
    render(<ResourceLink resource={resource} color="red" />);
    const link = screen.getByRole("listitem", { name: /royal crom/i });
    userEvent.click(link);
    const resourceCard = await screen.findByRole("dialog");
    const gmapsLink = rtl.getByRole(resourceCard, "link", {
      // ^ is used so we don't match "shipping address"
      name: /^address/i,
    });
    const gmapsBaseUrl = "https://maps.google.com/?q=";
    const addressQuery = `${resource.details.street} ${resource.details.city}, ${resource.details.province}`;
    const fullLink = encodeURI(gmapsBaseUrl + addressQuery);
    expect(gmapsLink).toHaveAttribute("href", fullLink);
  });
});
