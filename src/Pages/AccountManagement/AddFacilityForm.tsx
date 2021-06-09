import { MenuItem, TextField } from "@material-ui/core";
import { facilitiesQK } from "APIHooks/facilities";
import { useOrganization } from "APIHooks/organization";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { provinces } from "Data/geography";
import TypedAPI, { FacilityData } from "Helpers/typedAPI";
import { subset } from "Helpers/utils";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import styles from "./AddFacilityForm.module.css";
const api = new TypedAPI();
type FacilityFormData = {
  name: string;
  number?: number;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  shippingLabelNote?: string;
  attentionTo: string;
  phoneNumber: string;
  website: string;
  email: string;
};
const AddFacilityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FacilityFormData>();
  const orgQuery = useOrganization();
  const queryClient = useQueryClient();
  const addFacilityMutation = useMutation(
    (data: FacilityData) => api.createFacility(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(facilitiesQK);
        reset();
      },
    }
  );
  const onSubmit: SubmitHandler<FacilityFormData> = (formData) => {
    console.log(formData);
    if (!orgQuery.isSuccess) return;
    const data = {
      ...subset(
        formData,
        "name",
        "email",
        "postalCode",
        "website",
        "email",
        "city",
        "phoneNumber"
      ),
      street: formData.address,
      shippingStreet: formData.address,
      shippingCity: formData.city,
      shippingProvince: formData.province,
      shippingPostalCode: formData.postalCode,
      parentOrganization: orgQuery.data.url,
    };
    addFacilityMutation.mutate(data);
  };
  const defaultTextFieldProps = {
    size: "small",
    variant: "outlined",
  } as const;
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name")}
        {...defaultTextFieldProps}
        label="Facility Name"
        required
        placeholder="ex: University of Alberta Hospital"
        autoFocus
      />
      <hr />
      <p className={styles.sectionHeader}>Shipping Address</p>
      <TextField
        {...register("address")}
        {...defaultTextFieldProps}
        label="Address"
        required
      />
      <div className={styles.cityProvince}>
        <TextField
          {...register("city")}
          {...defaultTextFieldProps}
          label="City"
          required
          className={styles.city}
        />

        <Controller
          name="province"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...defaultTextFieldProps}
              label="Province"
              required
              select
              style={{ backgroundColor: "white" }}
              value={field.value}
              onChange={field.onChange}
              className={styles.province}
            >
              {provinces.map((province, i) => (
                <MenuItem
                  key={i}
                  style={{ backgroundColor: "white" }}
                  value={province.abbreviation}
                >
                  {province.abbreviation}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </div>
      <TextField
        {...register("postalCode")}
        {...defaultTextFieldProps}
        label="Postal Code"
        error={Boolean(errors.postalCode)}
        required
      />
      <TextField
        {...register("shippingLabelNote")}
        {...defaultTextFieldProps}
        label="Shipping Label Note"
      />

      <hr />
      <p className={styles.sectionHeader}>Contact Information</p>
      <TextField
        {...register("phoneNumber")}
        {...defaultTextFieldProps}
        label="Phone Number"
        type=""
      />
      <TextField
        {...register("website")}
        {...defaultTextFieldProps}
        label="Website"
        placeholder="www.yourwebsite.com"
      />
      <TextField
        {...register("email")}
        {...defaultTextFieldProps}
        label="Email"
        placeholder="example@domain.com"
      />
      <PrettyButton
        text="Add Facility"
        icon="add"
        style={{ alignSelf: "flex-end", marginTop: "1rem" }}
        disabled={addFacilityMutation.isLoading}
      />
    </form>
  );
};

export default AddFacilityForm;
