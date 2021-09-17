import IconButton from "Components/Content/IconButton";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import OrderCardHeader from "Components/Order/OrderCardHeader";
import SearchBar from "Components/Search/SearchBar";
import { api } from "Helpers/typedAPI";
import { notNull } from "Helpers/utils";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import {
  Order,
  OrderInvoice,
  OrderProduct,
  PaymentMethod,
  ProductPricing,
  SupplierQuote,
} from "Types";
import ApproveOrderDialog from "./ApproveOrderDialog";
import RequestedProductCard from "./RequestedProductCard";
import styles from "./RequestsPage.module.css";

const RequestPage = () => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  // Maps order product id to supplier qoute chosen for it.
  // Undefined means quote is loading for order product, null means order
  // product has no quotes.
  const [selectedQuotes, setSelectedQuotes] = useState<
    Record<number, SupplierQuote | undefined | null>
  >({});
  const requestsQuery = useQuery<Order[]>(["orders", "requested"], () => {
    return api.getOrders("open").then((response) => response.data);
  });
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
        orderProductPrices[pricing.id] = suppliers[i];
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
        chosenSuppliers[orderProduct.id] =
          data[orderProduct.id].purchaseOptions[0] ?? null;
        return chosenSuppliers;
      },
      {} as Record<number, SupplierQuote>
    );
    setSelectedQuotes((old) => ({ ...firstQuotes, ...old }));
  }, [orders, pricingQuery.data]);

  // const approveAllOrders = () => {
  //   if (!orders || !pricingQuery.isSuccess) return;
  //   setUpdatingOrders(true);
  //   Promise.all(orders.map((order, i) => approveOrder(order))).finally(() => {
  //     setUpdatingOrders(false);
  //     queryClient.invalidateQueries(["orders"]);
  //   });
  // };
  return (
    <div className={styles.root}>
      <Title text="Requests" />
      <div className={styles.actionBar}>
        {/* <PrettyButton
          text="Approve All"
          color="green"
          disabled={!orders || updatingOrders || !pricingQuery.isSuccess}
          onClick={approveAllOrders}
        /> */}
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
              selectedQuotes={order.orderProducts.map(
                ({ id: pk }) => selectedQuotes[pk]
              )}
              selectQuote={(orderProduct, supplier) => {
                setSelectedQuotes({
                  ...selectedQuotes,
                  [orderProduct.id]: supplier,
                });
              }}
              prices={
                pricingQuery.isSuccess
                  ? // purchase options for each order product
                    order.orderProducts.map(
                      ({ id: pk }) => pricingQuery.data[pk]
                    )
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
}: {
  order: Order;
  selectedQuotes?: (SupplierQuote | null | undefined)[];
  prices?: ProductPricing[];
  selectQuote: (orderProduct: OrderProduct, supplier: SupplierQuote) => void;
}) => {
  const [invoice, setInvoice] = useState<OrderInvoice | null>(null);
  const { orderProducts } = order;
  const queryClient = useQueryClient();
  const orderStatusMutation = useMutation(api.updateOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      alert("Payment could not be processed.");
      queryClient.invalidateQueries(["pricing"]);
    },
  });

  const supplierSelections = selectedQuotes
    ? selectedQuotes
        .map(
          (quote, i) =>
            quote && {
              supplierId: quote!.supplier.id,
              orderProductId: orderProducts[i].id,
            }
        )
        .filter(notNull)
    : [];
  const someProductsMissingSuppliers =
    supplierSelections.length < orderProducts.length;

  const denyOrder = () =>
    orderStatusMutation.mutate({ action: "cancel", order });
  const saveSelections = () => {
    orderStatusMutation.mutate(
      {
        order,
        action: "save-selections",
        data: supplierSelections,
      },
      {
        onSuccess: (response) => {
          setInvoice(response.data);
        },
      }
    );
  };
  const approveOrder = (paymentMethod: PaymentMethod, total: number) => {
    orderStatusMutation.mutate({
      order,
      action: "approve",
      data: {
        paymentMethodId: paymentMethod.id,
        total,
      },
    });
  };

  let orderPrice: number | null = 0;
  // const invoice: InvoiceItem[] = [];
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
      {invoice && (
        <ApproveOrderDialog
          handleClose={() => setInvoice(null)}
          {...{ invoice, approveOrder, orderProducts }}
        />
      )}
      <LoadingSpinner darkened show={orderStatusMutation.isLoading} />
      <OrderCardHeader order={order}>
        <VerticalDetail
          label="Order #"
          value={order.purchaseNo ?? order.orderNo}
        />
      </OrderCardHeader>
      {order.orderProducts.map((orderProduct, i) => (
        <RequestedProductCard
          selectedQuote={selectedQuotes ? selectedQuotes[i] : undefined}
          selectQuote={(quote) => selectQuote(orderProduct, quote)}
          key={orderProduct.id}
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
            text="Deny"
            color="red"
            onClick={denyOrder}
            icon="close"
            disabled={orderStatusMutation.isLoading}
          />
          <PrettyButton
            text="Approve"
            color="green"
            onClick={saveSelections}
            icon="done"
            disabled={
              orderStatusMutation.isLoading || someProductsMissingSuppliers
            }
          />
        </div>
      </div>
    </div>
  );
};

export const formatCurrency = (
  price: number | string | undefined | null
): string => {
  if (price == null) return "";
  if (typeof price === "string") price = Number(price);
  return `$${price.toFixed(2)} CAD`;
};
