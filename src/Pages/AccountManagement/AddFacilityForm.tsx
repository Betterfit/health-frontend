import { MenuItem, TextField } from "@material-ui/core";
import { facilitiesQK } from "APIHooks/facilities";
import { useOrganization } from "APIHooks/organization";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { provinces } from "Data/geography";
import TypedAPI, { FacilityData } from "Helpers/typedAPI";
import { subset } from "Helpers/utils";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
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
const AddFacilityForm = ({ handleClose }: { handleClose: () => void }) => {
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
        handleClose();
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
        "city"
      ),
      street: formData.address,
      shippingStreet: formData.address,
      shippingCity: formData.city,
      shippingProvince: formData.province,
      shippingPostalCode: formData.postalCode,
      parentOrganization: orgQuery.data.url,
      phoneNumber: formData.postalCode.toUpperCase(),
    };
    addFacilityMutation.mutate(data);
  };
  const defaultTextFieldProps = {
    size: "small",
    variant: "outlined",
  } as const;
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <LoadingSpinner darkened show={addFacilityMutation.isLoading} />
      <TextField
        {...register("name")}
        {...defaultTextFieldProps}
        label="Facility Name"
        id="name"
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
        id="address"
        required
      />
      <div className={styles.cityProvince}>
        <TextField
          {...register("city")}
          {...defaultTextFieldProps}
          label="City"
          id="city"
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
              id="province"
              required
              select
              value={field.value}
              onChange={field.onChange}
              className={styles.province}
              aria-label="province"
            >
              {provinces.map((province, i) => (
                <MenuItem key={i} value={province.abbreviation}>
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
        id="postalCode"
        required
        placeholder="A9A 9A9"
      />
      <TextField
        {...register("shippingLabelNote")}
        {...defaultTextFieldProps}
        label="Shipping Label Note"
        id="shippingLabelNote"
      />

      <hr />
      <p className={styles.sectionHeader}>Contact Information</p>
      <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputMask
            value={field.value}
            onChange={field.onChange}
            mask="(999)-999-9999"
            alwaysShowMask={false}
          >
            {() => (
              <TextField
                {...defaultTextFieldProps}
                label="Phone Number"
                id="phoneNumber"
              />
            )}
          </InputMask>
        )}
      />
      <TextField
        {...register("website")}
        {...defaultTextFieldProps}
        label="Website"
        id="website"
        placeholder="www.yourwebsite.com"
      />
      <TextField
        {...register("email")}
        {...defaultTextFieldProps}
        label="Email"
        id="email"
        placeholder="example@domain.com"
      />
      <PrettyButton
        text="Add Facility"
        icon="add"
        style={{ alignSelf: "flex-end", marginTop: "1rem" }}
        disabled={addFacilityMutation.isLoading}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default AddFacilityForm;
