import { MenuItem, TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./AddFacilityForm.module.css";

type FacilityData = {
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
    watch,
    formState: { errors },
  } = useForm<FacilityData>();
  const onSubmit: SubmitHandler<FacilityData> = (data) => console.log(data);
  console.log(watch("city"));
  console.log(errors.postalCode);
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
      />
      <hr />
      <p className={styles.sectionHeader}>Shipping Address</p>
      <TextField
        {...register("address")}
        {...defaultTextFieldProps}
        label="Address"
        required
      />
      <TextField
        {...register("city")}
        {...defaultTextFieldProps}
        label="City"
        required
      />
      <TextField
        {...register("postalCode")}
        {...defaultTextFieldProps}
        label="Postal Code"
        error={Boolean(errors.postalCode)}
        required
      />
      <TextField
        {...register("province")}
        {...defaultTextFieldProps}
        label="Province"
        required
        select
        style={{ backgroundColor: "white" }}
      >
        {["Alberta"].map((province) => (
          <MenuItem style={{ backgroundColor: "white" }}>{province}</MenuItem>
        ))}
      </TextField>

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
      />
    </form>
  );
};

export default AddFacilityForm;
