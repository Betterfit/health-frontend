import { MenuItem, TextField } from "@material-ui/core";
import { provinces } from "Data/geography";
import { api } from "Helpers/typedAPI";
import React, { useState } from "react";
import { useMutation } from "react-query";
import LoginPageForm from "./LoginPageForm";

interface FormData {
  province: string;
  orgName: string;
}
const OrganizationRegistration = ({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: () => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    orgName: "",
    province: "",
  });

  const registerMutation = useMutation(
    async () =>
      await api.registerPurchaser({
        orgName: formData.orgName,
        adminEmail: email,
        province: formData.province,
      }),
    { onSuccess: onSuccess }
  );
  return (
    <LoginPageForm
      title="Register Organization"
      subtitle="Register your organization with Supply Net"
      handleSubmit={registerMutation.mutate}
      submitLabel="Register"
    >
      <TextField
        label="Organization Name"
        id="org name"
        variant="outlined"
        value={formData.orgName}
        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
        required
      />
      <TextField
        value={formData.province}
        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
        id="province"
        label="Province"
        variant="outlined"
        required
        select
        helperText="The province of your billing address."
      >
        {provinces.map((province, i) => (
          <MenuItem key={i} value={province.abbreviation}>
            {province.name}
          </MenuItem>
        ))}
      </TextField>
    </LoginPageForm>
  );
};

export default OrganizationRegistration;
