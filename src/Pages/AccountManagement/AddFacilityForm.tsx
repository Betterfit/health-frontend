import { MenuItem, TextField } from "@material-ui/core";
import clsx from "clsx";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { provinces } from "Data/geography";
import TypedAPI from "Helpers/typedAPI";
import { subset } from "Helpers/utils";
import { facilitiesQK } from "Models/facilities";
import { useOrganization } from "Models/organization";
import React from "react";
import { Control } from "react-hook-form";
import InputMask from "react-input-mask";
import { useMutation, useQueryClient } from "react-query";
import { useFormState } from "react-use-form-state";
import { Facility } from "Types";
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
/** Add new facility, or edit an existing one */
const AddFacilityForm = ({
  handleClose,
  existingFacility,
  className,
}: {
  handleClose: () => void;
  /** This form will edit if an existing facility is given */
  existingFacility?: Facility;
  className?: string;
}) => {
  const defaultValues = existingFacility
    ? populateWithExistingFacility(existingFacility)
    : { province: "" };
  const [formState, register] = useFormState<FacilityFormData>(defaultValues, {
    withIds: true,
  });
  const { errors, setField, values: formData } = formState;
  console.log(defaultValues);
  const editing = existingFacility != null;
  const orgQuery = useOrganization();
  const queryClient = useQueryClient();
  const facilityMutation = useMutation(
    async (action: "create" | "update" | "delete") => {
      const client = await api.getClient();
      if (action === "delete") {
        return client.delete(existingFacility!.url);
      }

      const data = {
        ...subset(
          formData,
          "name",
          "email",
          "website",
          "city",
          "postalCode",
          "province"
        ),
        street: formData.address,
        parentOrganization: orgQuery.data!.url,
        phoneNumber: formData.phoneNumber,
      };
      if (action === "create") return api.createFacility(data);
      if (action === "update") return client.patch(existingFacility!.url, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(facilitiesQK);
        handleClose();
        formState.reset();
      },
    }
  );
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!orgQuery.isSuccess || facilityMutation.isLoading) return;
    const action = existingFacility ? "update" : "create";
    facilityMutation.mutate(action);
  };
  return (
    <form className={clsx(styles.form, className)} onSubmit={onSubmit}>
      <LoadingSpinner darkened show={facilityMutation.isLoading} />
      <TextField
        {...register.text("name")}
        {...defaultTextFieldProps}
        label="Facility Name"
        required
        placeholder="ex: University of Alberta Hospital"
      />
      <hr />
      <p className={styles.sectionHeader}>Shipping Address</p>
      <TextField
        {...register.text("address")}
        {...defaultTextFieldProps}
        label="Address"
        required
      />
      <div className={styles.cityProvince}>
        <TextField
          {...register.text("city")}
          {...defaultTextFieldProps}
          label="City"
          required
          className={styles.city}
        />

        <TextField
          {...register.select("province")}
          onChange={(e) => setField("province", e.target.value)}
          {...defaultTextFieldProps}
          label="Province"
          data-testid="province selector"
          required
          select
          className={styles.province}
        >
          {provinces.map((province, i) => (
            <MenuItem key={i} value={province.abbreviation}>
              {province.abbreviation}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <TextField
        {...register.text("postalCode")}
        onChange={(e) =>
          // capitalize and strip spaces
          setField(
            "postalCode",
            e.target.value.toUpperCase().replaceAll(" ", "")
          )
        }
        {...defaultTextFieldProps}
        label="Postal Code"
        error={errors?.postalCode != null}
        required
        placeholder="A9A 9A9"
        inputProps={{ readOnly: editing, maxLength: 7, minLength: 6 }}
      />
      <TextField
        {...register.text("shippingLabelNote")}
        {...defaultTextFieldProps}
        label="Shipping Label Note"
        id="shippingLabelNote"
      />

      <hr />
      <p className={styles.sectionHeader}>Contact Information</p>
      <InputMask
        {...register.text("phoneNumber")}
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
      <TextField
        {...register.text("website")}
        {...defaultTextFieldProps}
        label="Website"
        placeholder="www.yourwebsite.com"
      />
      <TextField
        {...register.email("email")}
        {...defaultTextFieldProps}
        label="Email"
        placeholder="example@domain.com"
      />
      <div className="flex justify-end">
        {editing && (
          <PrettyButton
            text="Delete"
            icon="delete"
            color="red"
            onClick={() => facilityMutation.mutate("delete")}
          />
        )}
        <PrettyButton
          type="submit"
          text={editing ? "Save" : "Add Facility"}
          icon={editing ? "save" : "add"}
          disabled={facilityMutation.isLoading}
        />
      </div>
    </form>
  );
};

const populateWithExistingFacility = (
  facility: Facility
): Partial<FacilityFormData> => ({
  ...subset(
    facility,
    "name",
    "email",
    "postalCode",
    "website",
    "city",
    "phoneNumber"
  ),
  address: facility.street,
  province: facility.province,
});
export default AddFacilityForm;

interface ControlledTextFieldProps {
  control: Control<FacilityFormData>;
  name: string;
  label: string;
}

const defaultTextFieldProps = {
  size: "small",
  variant: "outlined",
} as const;
