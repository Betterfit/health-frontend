import dayjs from "dayjs";
import Translator from "Helpers/Translator";
import React from "react";
import { Facility } from "Types";

export interface TextProps {
  title?: string;
  value?: string;
  classes?: string;
}
const OrderComponent = ({ title, value, classes }: TextProps) => {
  return (
    <div
      className={
        "flex flex-col pr-4 md:pb-3 py-3 md:py-1 max-w-1/2 " +
        (classes ? classes : "")
      }
    >
      <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-75 font-semibold">
        {Translator(title)}
      </span>
      <span className="text-betterfit-graphite text-base word break-words">
        {value}
      </span>
    </div>
  );
};

const OrderComponentTitle = ({ title, value, classes }: TextProps) => {
  return (
    <div
      className={
        "flex flex-col pr-4 md:pb-3 py-3 md:py-1 " + (classes ? classes : "")
      }
    >
      <span className="uppercase text-betterfit-graphite text-xs tracking-extra-wide opacity-75 font-semibold">
        {Translator(title)}
      </span>
      <span className="text-betterfit-graphite text-3xl">{value}</span>
    </div>
  );
};

const NewOrderHeader = ({
  data,
  facility,
  facilities,
  setFacility,
}: {
  data: any;
  facility?: Facility;
  facilities?: Facility[];
  setFacility: (facility: Facility) => void;
}) => {
  let orderDate = dayjs().format("MMM DD, YYYY");
  const order_no = data?.order_number
    ? data.order_number
    : Translator("New Order");
  const purchase_order = data?.purchase_order;

  return (
    <div className="flex flex-col p-4 pb-2 border-b border-betterfit-grey border-opacity-40">
      <OrderComponentTitle title={orderDate} value={order_no} />
      {purchase_order && (
        <OrderComponent title="Purchase Order" value={purchase_order} />
      )}
      <div className="flex flex-col items-start">
        <label
          className="pl-1 uppercase text-betterfit-graphite text-xs tracking-extra-wide opacity-75 font-semibold"
          htmlFor="facility"
        >
          Destination Facility
        </label>
        <select
          name="facility"
          className="bg-transparent text-lg"
          onChange={(e) => {
            const selectedFacility = facilities?.find(
              (facility) => facility.id.toString() === e.target.value
            );
            if (selectedFacility) setFacility(selectedFacility);
          }}
          value={facility?.id}
        >
          {facilities?.map((facility) => (
            <option key={facility.id} value={facility.id}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default NewOrderHeader;
