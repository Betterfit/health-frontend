import { productDisplayName } from "APIHooks/products";
import IconButton from "Components/Content/IconButton";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import OrderCardHeader from "Components/Order/OrderCardHeader";
import SearchBar from "Components/Search/SearchBar";
import { api } from "Helpers/typedAPI";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import {
  Order,
  OrderProduct,
  PaymentMethod,
  ProductPricing,
  SupplierQuote,
} from "Types";
import ApproveOrderDialog, { InvoiceItem } from "./ApproveOrderDialog";
import RequestedProductCard from "./RequestedProductCard";
import styles from "./RequestsPage.module.css";

const RequestPage = () => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
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
      <div className={styles.titleSection}>
        <Title text="Requests" />
      </div>
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
}: {
  order: Order;
  selectedQuotes?: (SupplierQuote | null | undefined)[];
  prices?: ProductPricing[];
  selectQuote: (orderProduct: OrderProduct, supplier: SupplierQuote) => void;
}) => {
  const { orderProducts } = order;
  const queryClient = useQueryClient();
  const orderStatusMutation = useMutation(api.updateOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      alert("Could not update order status");
    },
  });

  const denyOrder = () =>
    orderStatusMutation.mutate({ action: "cancel", order });
  const approveOrder = (paymentMethod: PaymentMethod) => {
    if (!selectedQuotes) return;
    const supplierSelections = [];
    for (let i = 0; i < selectedQuotes.length; i++) {
      const quote = selectedQuotes[i];
      const orderProduct = orderProducts[i];
      if (quote == null)
        throw Error(
          `${order.pk} does not have a supplier for every order product`
        );
      supplierSelections.push({
        supplierId: quote.supplier.id,
        id: orderProduct.pk,
        totalPrice: quote.priceInfo.totalPrice,
      });
    }
    orderStatusMutation.mutate({
      order,
      action: "approve",
      data: {
        orderProducts: supplierSelections,
        paymentMethodId: paymentMethod.id,
      },
    });
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  let orderPrice: number | null = 0;
  const invoice: InvoiceItem[] = [];
  if (selectedQuotes) {
    orderProducts.forEach((orderProduct, i) => {
      const quote = selectedQuotes[i];
      // don't display an order total if we don't have a quote for every product in the order
      if (quote == null) orderPrice = null;
      else if (orderPrice != null) {
        orderPrice += quote.priceInfo.totalPrice;
        invoice.push({
          name: `${productDisplayName(orderProduct.productOption)}`,
          quantity: orderProduct.quantity,
          cost: quote.priceInfo.totalPrice,
        });
      }
    });
  }

  return (
    <div className={styles.order} data-testid={"request-" + order.orderNo}>
      <ApproveOrderDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        itemizedInvoice={invoice}
        total={orderPrice}
        approveOrder={approveOrder}
      />
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
            text="Deny"
            color="red"
            onClick={denyOrder}
            icon="close"
            disabled={orderStatusMutation.isLoading}
          />
          <PrettyButton
            text="Approve"
            color="green"
            onClick={() => setDialogOpen(true)}
            icon="done"
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
