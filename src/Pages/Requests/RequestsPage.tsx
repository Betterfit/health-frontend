import IconButton from "Components/Content/IconButton";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import OrderCardHeader from "Components/Order/OrderCardHeader";
import SearchBar from "Components/Search/SearchBar";
import { api } from "Helpers/typedAPI";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { Order, OrderProduct, ProductPricing, SupplierQuote } from "Types";
import RequestedProductCard from "./RequestedProductCard";
import styles from "./RequestsPage.module.css";

const RequestPage = () => {
  const queryClient = useQueryClient();
  // Maps order product id to supplier qoute chosen for it.
  // Undefined means quote is loading for order product, null means order
  // product has no quotes.
  const [selectedQuotes, setSelectedQuotes] = useState<
    Record<number, SupplierQuote | undefined | null>
  >({});
  const requestsQuery = useQuery<Order[]>(["orders", "requested"], () => {
    return api.getOrders("open").then((response) => response.data);
  });
  const [updatingOrders, setUpdatingOrders] = useState(false);
  const { data: orders, isLoading: loadingOrders } = requestsQuery;

  const priceRequests = orders
    ? orders.flatMap((order) =>
        order.orderProducts.map((orderProduct) => ({
          productOptionId: orderProduct.productOption.id,
          quantity: orderProduct.quantity,
          facilityId: order.facility.id,
        }))
      )
    : [];

  const pricingQuery = useQuery<Record<number, ProductPricing>>(
    ["pricing", priceRequests],
    async () => {
      const suppliers = await api
        .getPricing(priceRequests)
        .then((response) => response.data);
      const orderProducts = orders!.flatMap((order) => order.orderProducts);
      return orderProducts.reduce((orderProductPrices, pricing, i) => {
        orderProductPrices[pricing.pk] = suppliers[i];
        return orderProductPrices;
      }, {} as Record<number, ProductPricing>);
    },
    {
      enabled: requestsQuery.isSuccess,
    }
  );
  // choose default suppliers for each product on first render with pricing data available
  useEffect(() => {
    if (!pricingQuery.data) return;
    const data = pricingQuery.data;
    const orderProducts = orders!.flatMap((order) => order.orderProducts);
    // use the first quote for each orderProduct as the default chosen one
    const firstQuotes = orderProducts.reduce(
      (chosenSuppliers, orderProduct, i) => {
        chosenSuppliers[orderProduct.pk] =
          data[orderProduct.pk].purchaseOptions[0] ?? null;
        return chosenSuppliers;
      },
      {} as Record<number, SupplierQuote>
    );
    setSelectedQuotes((old) => ({ ...firstQuotes, ...old }));
  }, [orders, pricingQuery.data]);

  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const approveOrder = (order: Order) => {
    const supplierSelections = order.orderProducts.map((orderProduct) => ({
      // supplierId might be undefined, but we catch that in the following if statement
      supplierId: selectedQuotes[orderProduct.pk]?.supplier.id as number,
      id: orderProduct.pk,
    }));
    if (supplierSelections.some(({ supplierId }) => supplierId == null))
      return Promise.reject(
        new Error(
          `${order.pk} does not have a supplier for every order product`
        )
      );
    return api.updateOrderStatus({
      order,
      action: "approve",
      data: supplierSelections,
    });
  };
  const updateOrderStatus = (order: Order, action: "approve" | "cancel") =>
    action === "approve"
      ? approveOrder(order)
      : api.updateOrderStatus({ order, action });

  const approveAllOrders = () => {
    if (!orders || !pricingQuery.isSuccess) return;
    setUpdatingOrders(true);
    Promise.all(orders.map((order, i) => approveOrder(order))).finally(() => {
      setUpdatingOrders(false);
      queryClient.invalidateQueries(["orders"]);
    });
  };
  return (
    <div className={styles.root}>
      <div className={styles.titleSection}>
        <Title text="Requests" />
        <span className="mt-2">{moment().format("MMMM D, YYYY")}</span>
      </div>
      <div className={styles.actionBar}>
        <PrettyButton
          text="Approve All"
          color="green"
          disabled={!orders || updatingOrders || !pricingQuery.isSuccess}
          onClick={approveAllOrders}
        />
        <SearchBar
          performSearch={setSearchText}
          placeholderText="Search Requests"
          startingText={searchText}
          // only perform search after the user has stopped typing for 100ms
          msDelay={100}
          className={styles.search}
        />
        <IconButton iconName="filter_list" />
      </div>
      <div className={styles.orders}>
        {orders ? (
          orders.map((order) => (
            <RequestedOrderCard
              order={order}
              key={order.pk}
              updateOrderStatus={updateOrderStatus}
              selectedQuotes={order.orderProducts.map(
                ({ pk }) => selectedQuotes[pk]
              )}
              selectQuote={(orderProduct, supplier) => {
                setSelectedQuotes({
                  ...selectedQuotes,
                  [orderProduct.pk]: supplier,
                });
              }}
              prices={
                pricingQuery.isSuccess
                  ? // purchase options for each order product
                    order.orderProducts.map(({ pk }) => pricingQuery.data[pk])
                  : undefined
              }
            />
          ))
        ) : (
          <LoadingSpinner />
        )}
        {!loadingOrders && orders?.length === 0 && (
          <>
            <p className="mt-2">No requested orders</p>
            <PrettyButton
              text="See all orders"
              color="blue"
              onClick={() => history.push("orders")}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default RequestPage;

const RequestedOrderCard = ({
  order,
  selectedQuotes,
  prices,
  selectQuote,
  updateOrderStatus,
}: {
  order: Order;
  selectedQuotes?: (SupplierQuote | null | undefined)[];
  prices?: ProductPricing[];
  selectQuote: (orderProduct: OrderProduct, supplier: SupplierQuote) => void;
  updateOrderStatus: (
    order: Order,
    action: "approve" | "cancel"
  ) => Promise<any>;
}) => {
  // list of selected quotes for each order product in this order
  const queryClient = useQueryClient();
  const orderStatusMutation = useMutation(
    (action: "cancel" | "approve") => updateOrderStatus(order, action),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        console.log("performed query");
        // future performance optimization so that we don't have to query the
        // server every time we approve or deny an order
        // queryClient.setQueryData(["orders", "requested"], (oldOrders: any) =>
        //   oldOrders?.filter((oldOrder: Order) => oldOrder.pk !== order.pk)
        // );
      },
      onError: () => {
        alert("Could not update order status");
      },
    }
  );

  const { orderProducts } = order;
  const denyOrder = () => orderStatusMutation.mutate("cancel");
  const approveOrder = () => orderStatusMutation.mutate("approve");

  let orderPrice: number | null = 0;
  if (selectedQuotes) {
    orderProducts.forEach((orderProduct, i) => {
      const quote = selectedQuotes[i];
      // don't display an order total if we don't have a quote for every product in the order
      if (quote == null) orderPrice = null;
      else if (orderPrice != null) orderPrice += quote.priceInfo.totalPrice;
    });
  }

  return (
    <div className={styles.order} data-testid={"request-" + order.orderNo}>
      <LoadingSpinner darkened show={orderStatusMutation.isLoading} />
      <OrderCardHeader order={order} />
      {order.orderProducts.map((orderProduct, i) => (
        <RequestedProductCard
          selectedQuote={selectedQuotes ? selectedQuotes[i] : undefined}
          selectQuote={(quote) => selectQuote(orderProduct, quote)}
          key={orderProduct.pk}
          pricing={prices && prices[i]}
          {...{ order, orderProduct }}
        />
      ))}
      <div className={styles.orderBottom}>
        <p className="py-2">
          Order Total:{" "}
          <span className={styles.money}>{formatCurrency(orderPrice)}</span>
        </p>
        <div className={styles.orderActions}>
          <PrettyButton
            text="Approve"
            color="green"
            onClick={approveOrder}
            icon="done"
            disabled={orderStatusMutation.isLoading}
          />
          <PrettyButton
            text="Deny"
            color="red"
            onClick={denyOrder}
            icon="close"
            disabled={orderStatusMutation.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export const formatCurrency = (price: number | undefined | null) => {
  if (price == null) return "";
  return `$${price.toFixed(2)} CAD`;
};
