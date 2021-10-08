import dayjs from "dayjs";
import Translator from "Helpers/Translator";
import { useUserFacilities } from "Models/facilities";
import React, { useEffect } from "react";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";

export interface TextProps {
  title?: string;
  value?: string;
  classes?: string;
}

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

/**
 * Lets purchasers choose the destination facility.
 * Shows information about the order when editing.
 */
const NewOrderHeader = () => {
  const { data: userFacilities } = useUserFacilities();
  const destinationId = useAppSelector((state) => state.cart.destinationId);
  const orderId = useAppSelector((state) => state.cart.orderId);
  const dispatch = useAppDispatch();
  const setDestination = (facilityId: number) =>
    dispatch(cartActions.setDestinationId(facilityId));
  // sets the destination if it's currently undefined
  useEffect(() => {
    if (!destinationId && userFacilities && userFacilities.length > 0)
      dispatch(cartActions.setDestinationId(userFacilities[0].id));
  }, [destinationId, userFacilities, dispatch]);
  let orderDate = dayjs().format("MMM DD, YYYY");
  return (
    <div className="flex flex-col p-4 pb-2 border-b border-betterfit-grey border-opacity-40">
      <OrderComponentTitle
        title={orderDate}
        value={orderId ? `Order #${orderId}` : "New Order"}
      />
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
            setDestination(Number(e.target.value));
          }}
          value={destinationId}
        >
          {userFacilities?.map((facility) => (
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
