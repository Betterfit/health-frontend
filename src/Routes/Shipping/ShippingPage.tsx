import { MenuItem, TextField } from "@material-ui/core";
import clsx from "clsx";
import AdminTabs from "Components/Content/AdminTabs";
import PrettyLink from "Components/Content/PrettyLink";
import Title from "Components/Content/Title";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import { useOrganization } from "Models/organization";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styles from "./ShippingPage.module.css";

const supportedCarriers = ["Canada Post"];
const ShippingPage = () => {
  return (
    <div className={clsx("page", styles.root)}>
      <Title>Shipping</Title>
      <AdminTabs
        tabs={[
          { header: "Shipping Carrier", content: <ShippingCarrierSelect /> },
        ]}
        selectedIndex={0}
        setSelectedIndex={() => {}}
        ariaLabel="Shipping Carrier"
      />
      <ShippingExplainer />
    </div>
  );
};

const ShippingCarrierSelect = () => {
  const queryClient = useQueryClient();
  const { data: organization } = useOrganization();
  const [carrier, setCarrier] = useState("");
  useEffect(() => {
    if (organization?.carrier) setCarrier(organization.carrier);
  }, [organization]);

  const orgMutation = useMutation(
    () => api.updateOrganization(organization!.id, { carrier }),
    { onSuccess: () => queryClient.invalidateQueries("organization") }
  );
  return (
    <div className={styles.carrierSelect}>
      <p>Choose your default shipping carrier.</p>
      <p className="mb-4">
        If needed, you can override this on the product level.
      </p>
      <TextField
        value={carrier}
        id="shippingProviderInput"
        label="Shipping Provider"
        variant="outlined"
        size="small"
        select
        fullWidth
        onChange={(e) => setCarrier(e.target.value)}
      >
        {supportedCarriers.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <PrettyButton
        className="ml-auto"
        text="Save"
        onClick={orgMutation.mutate}
        disabled={orgMutation.isLoading}
      />
    </div>
  );
};

const ShippingExplainer = () => {
  return (
    <div className={clsx("cardBorder", styles.explainer)}>
      <h2>Shipping Types</h2>
      <hr />
      <h3>Free Shipping (Default)</h3>
      <p>
        Purchasers will not be charged a shipping fee for your product. You
        should price your product high enough to compensate for any shipping
        costs you have.
      </p>
      <hr />
      <h3>Quoted Shipping</h3>
      <p>
        If your products do not have free shipping, then we will charge
        purchasers a shipping fee based on a quote from your preferred carrier
        (ex UPS, Fedex).
      </p>
      <p>
        In order to use this method, you will have to specify the weight and
        size of your product. You can do this on the{" "}
        <PrettyLink to="/inventory" text="inventory page" />.
      </p>
    </div>
  );
};
export default ShippingPage;
