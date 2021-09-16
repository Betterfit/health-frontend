import clsx from "clsx";
import React from "react";
import { Payment } from "Types";

const PaymentCard = ({ payment }: { payment: Payment }) => {
  return <div className={clsx("cardBorder")}></div>;
};

export default PaymentCard;
