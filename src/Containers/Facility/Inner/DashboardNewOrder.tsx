import OrderHeader from "Components/Order/NewOrderHeader";
import OrderCart from "Components/Order/OrderCart";
import { useCartStore } from "Context/cartContext";
import { observer } from "mobx-react";
import { useUserFacilities } from "Models/facilities";
import React, { useEffect, useState } from "react";
import { Facility } from "Types";

const DashboardNewOrder = observer(() => {
  const cartStore = useCartStore() as any;
  const { data: facilities } = useUserFacilities();
  const [facility, setFacility] = useState<Facility | undefined>();
  useEffect(() => {
    if (!facility && facilities && facilities.length > 0)
      setFacility(facilities[0]);
  }, [facility, facilities]);

  let headerData = {
    facility: facility?.name,
    unit: null,
  };

  return (
    <>
      <OrderHeader
        data={headerData}
        {...{ facility, setFacility, facilities }}
      />
      <OrderCart Cart={cartStore?.cart} facility={facility} />
    </>
  );
});

export default DashboardNewOrder;
