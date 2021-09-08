import { useMyProfile } from "APIHooks/user";
import Modal from "Components/Content/Modal";
import Button from "Components/Forms/Button";
import Checkbox from "Components/Forms/CheckboxConfirm";
import OrderName from "Components/Forms/OrderName";
import OrderProductCard from "Components/Order/OrderProductCard";
import { useAuthStore } from "Context/authContext";
import { useCartStore } from "Context/cartContext";
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
import EmptyCart from "Images/Icons/shopping-cart-empty.svg";
import { useObserver } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";

const api = new Api();

const OrderCart = ({ Cart, id = null, facility }) => {
  console.log(facility);
  const history = useHistory();
  const myProfileQuery = useMyProfile();
  let CartData = JSON.stringify(Cart);
  CartData = JSON.parse(CartData);
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const [cartItems, setCartItems] = useState(null);
  const [modalOrder, setModalOrder] = useState(false);
  const [modalDraft, setModalDraft] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeTermsError, setAgreeTermsError] = useState(false);
  const getCartItems = () => {
    const promises = CartData.map((item, i) =>
      api.getProductOption(item.pk).then((data) => {
        return {
          ...data.data,
          quantity: item.quantity,
          priority: item.priority,
        };
      })
    );

    // resolve all the api calls in parallel and populate the messageData object as they resolve
    Promise.all(promises)
      .then((responses) => {
        setCartItems(responses);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (CartData) {
      if (!cartItems) {
        getCartItems();
      } else {
        if (cartItems.length !== CartData.length) {
          getCartItems();
        }
      }
    }
  });

  const confirmCallBack = (status) => {
    if (agreeTerms || status === "draft") {
      let order = {
        facility: facility.id,
        user: myProfileQuery.data.id,
        purchase_no: cartStore.newOrderName,
        status: status,
        order_products: CartData.map((item) => {
          return {
            quantity: item.quantity,
            product_option: item.pk,
            pk: item.product_pk,
            priority: item.priority ? "stat" : "normal",
          };
        }),
      };
      if (cartStore.cartType === "editCart") {
        delete order.facility;
        delete order.facility_admin;
        api.editOrder(order, id).then((response) => {
          setModalOrder(false);
          setModalDraft(false);
          cartStore.newOrderName = "";
          cartStore.cart = [];
          cartStore.updateLocalCartStorage();
          setCartItems(null);
          history.push(`/dashboard/orders/detail/${response.data.pk}`);
        });
      } else {
        api.setNewOrder(order).then((response) => {
          setModalOrder(false);
          setModalDraft(false);
          cartStore.newOrderName = "";
          cartStore.cart = [];
          cartStore.updateLocalCartStorage();
          setCartItems(null);
          history.push(`/dashboard/orders/detail/${response.data.pk}`);
        });
      }
    } else {
      setAgreeTermsError(true);
    }
  };

  const setOrderName = (name) => {
    cartStore.newOrderName = name;
  };

  return useObserver(() => (
    <>
      <div
        className="flex-grow flex flex-col overflow-hidden"
        aria-label="cart"
        role="complementary"
      >
        <div role="list" className="p-3 my-4 overflow-y-scroll p-4">
          {cartItems &&
            cartItems.length >= 1 &&
            cartItems.map((item, index) => {
              return (
                <OrderProductCard
                  key={`${item.name.replace(/\s/g, "")}-${item.pk}`}
                  product={item}
                />
              );
            })}
        </div>
        {!cartItems ||
          (cartItems.length === 0 && (
            <>
              <ReactSVG
                src={EmptyCart}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "display:block;margin:auto");
                }}
              ></ReactSVG>
              <p className="text-base text-betterfit-graphite opacity-75 text-center">
                {Translator("No products added")}
              </p>
            </>
          ))}
      </div>
      <div className="flex flex-row space-x-2 p-4">
        <Button
          color=" bg-white"
          hoverColor="bg-gray-100"
          text="Save Draft"
          textColor="text-betterfit-navy"
          text_size="text-sm"
          borderColor="border-betterfit-grey"
          onClick={() => {
            setModalDraft(!modalOrder);
            setAgreeTermsError(false);
          }}
        />
        <Button
          color=" bg-betterfit-green"
          hoverColor="bg-green-900"
          text="Submit Order"
          text_size="text-sm"
          onClick={() => {
            setModalOrder(!modalOrder);
            setAgreeTermsError(false);
          }}
        />
      </div>
      <>
        {modalOrder && (
          <Modal
            cancelCallBack={() => setModalOrder(!modalOrder)}
            confirmCallBack={() => confirmCallBack("open")}
            buttonText="Place Order"
          >
            <div className="px-6 py-4 border-b border-gray-300">
              <h2 className="text-dark-blue text-xl">
                {Translator("Confirm Order")}
              </h2>
            </div>
            <div className="py-6 px-6">
              <p className="text-paragraph text-base">
                {Translator(
                  "Are you sure you’re ready to submit this order? Would you like to add a purchase order to it?"
                )}
              </p>
            </div>
            <OrderName
              name={cartStore.newOrderName}
              callBack={(name) => setOrderName(name)}
            />
            <div className="mb-6 px-6 pt-2">
              <Checkbox
                name="Agree To Terms"
                value={agreeTerms}
                setValue={(val) => setAgreeTerms(val)}
                resetErrors={() => setAgreeTermsError(false)}
              />
              {agreeTermsError && (
                <div className="mt-4 text-status-dark-red text-xs uppercase font-bold">
                  Please agree to terms
                </div>
              )}
            </div>
          </Modal>
        )}
      </>
      <>
        {modalDraft && (
          <Modal
            cancelCallBack={() => setModalDraft(!modalDraft)}
            confirmCallBack={() => confirmCallBack("draft")}
            buttonText="Save Draft"
          >
            <div className="px-6 py-4 border-b border-gray-300">
              <h2 className="text-betterfit-navy text-xl">
                {Translator("Save as Draft")}
              </h2>
            </div>
            <div className="py-6 px-6">
              <p className="text-paragraph text-base">
                {Translator("Would you like to add a purchase order to it?")}
              </p>
            </div>
            <OrderName
              name={cartStore.newOrderName}
              callBack={(name) => setOrderName(name)}
            />
          </Modal>
        )}
      </>
    </>
  ));
};

export default OrderCart;
