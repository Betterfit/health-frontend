import {
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import { subset } from "Helpers/utils";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ProductOption } from "Types";

interface FormData {
  id: number;
  freeShipping: boolean;
  width: number | null;
  height: number | null;
  length: number | null;
  sizeUnit: "cm" | "in";
  weight: number | null;
  weightUnit: "kg" | "lb";
  carrier: string | null;
}
const ShippingInfoForm = ({ product }: { product: ProductOption }) => {
  const [formData, setFormData] = useState<FormData>(parseProduct(product));
  // repopulate formData if the product changes, prevents stale default value
  useEffect(() => {
    setFormData(parseProduct(product));
  }, [product, formData.id]);

  const queryClient = useQueryClient();
  const productMutation = useMutation(
    () => api.updateProductOption(product.id, formData),
    { onSuccess: () => queryClient.invalidateQueries("inventory") }
  );
  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (!productMutation.isLoading) productMutation.mutate();
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={formData.freeShipping}
            onChange={(e, freeShipping) =>
              setFormData((old) => ({ ...old, freeShipping }))
            }
          />
        }
        label="Free Domestic Shipping"
      />
      {formData.freeShipping && (
        <p className="text-center">
          You will have to ship this product to purchasers at no extra cost.
          Please price this product high enough to compensate, or disable free
          shipping.
        </p>
      )}
      {!formData.freeShipping && (
        <div className="flex justify-around w-full my-2">
          <div className="flex flex-col items-center flex-1 space-y-2">
            <UnitPicker
              key={product.id + "-size-unit"}
              name="Size"
              units={["cm", "in"]}
              selectedUnit={formData.sizeUnit ?? "cm"}
              selectUnit={(sizeUnit) =>
                setFormData((old) => ({
                  ...old,
                  sizeUnit: sizeUnit as "in" | "cm",
                }))
              }
            />
            <DimensionInputs
              key={product.id + "-size"}
              unit={formData.sizeUnit}
              dimensions={[
                { name: "length", value: formData.length },
                { name: "width", value: formData.width },
                { name: "height", value: formData.height },
              ]}
              updateDimension={(name, value) =>
                setFormData({ ...formData, [name]: value })
              }
            />
          </div>
          <div className="flex flex-col items-center flex-1 space-y-2">
            <UnitPicker
              key={product.id + "-weight-unit"}
              name="Weight"
              units={["kg", "lb"]}
              selectedUnit={formData.weightUnit}
              selectUnit={(unit) =>
                setFormData({ ...formData, weightUnit: unit as "kg" | "lb" })
              }
            />
            <DimensionInputs
              key={product.id + "-weight"}
              unit={formData.weightUnit}
              dimensions={[{ name: "weight", value: formData.weight }]}
              updateDimension={(name, value) =>
                setFormData({ ...formData, [name]: value })
              }
            />
          </div>
          <div className="flex flex-col"></div>
        </div>
      )}
      <PrettyButton
        text="Save Changes"
        type="submit"
        disabled={productMutation.isLoading}
      />
    </form>
  );
};

const UnitPicker = ({
  name,
  units,
  selectedUnit,
  selectUnit,
}: {
  name: string;
  units: string[];
  selectedUnit: string;
  selectUnit: (newVal: string) => void;
}) => {
  return (
    <>
      <p>{name}</p>
      <RadioGroup
        aria-label={name}
        row
        value={selectedUnit}
        onChange={(e) => {
          selectUnit(e.target.value);
        }}
      >
        {units.map((unit) => (
          <FormControlLabel control={<Radio />} value={unit} label={unit} />
        ))}
      </RadioGroup>
    </>
  );
};

const DimensionInputs = ({
  unit,
  dimensions,
  updateDimension,
}: {
  unit: string;
  dimensions: { name: string; value: number | null }[];
  updateDimension: (name: string, value: number) => void;
}) => (
  <>
    {dimensions.map(({ name, value }) => (
      <TextField
        key={name}
        id={name + "-input"}
        value={value}
        label={capitalize(name)}
        type="number"
        variant="outlined"
        size="small"
        onChange={(e) => updateDimension(name, Number(e.target.value))}
        required
        InputProps={{
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        }}
        style={{ width: "160px" }}
      />
    ))}
  </>
);

const parseProduct = (product: ProductOption): FormData => {
  const parsed = subset(
    product,
    "id",
    "freeShipping",
    "width",
    "height",
    "length",
    "weight",
    "carrier"
  );
  return {
    ...parsed,
    weightUnit: product.weightUnit ?? "kg",
    sizeUnit: product.sizeUnit ?? "cm",
  };
};

export default ShippingInfoForm;
