import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import { formatTimeStamp } from "Helpers/utils";
import { fullName } from "Models/user";
import React from "react";
import { Order } from "Types";

const OrderCardHeader = ({
  order,
  children,
}: {
  order: Order;
  children?: React.ReactNode;
}) => {
  // Formats like this: Aug 16, 2021 - 6:07 PM
  // https://momentjs.com/docs/#/displaying/
  return (
    <div className={"cardHeader"}>
      <VerticalDetail label="Ordered by" value={fullName(order.authorUser)} />
      <VerticalDetail
        label="Ordered on"
        value={formatTimeStamp(order.orderDate)}
      />
      <VerticalDetail label="Destination" value={order.facility.name} />
      {children}
    </div>
  );
};

export default OrderCardHeader;
