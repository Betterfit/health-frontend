import React, {useState,useEffect} from "react";
import { useObserver} from "mobx-react"
import Button from "Components/Forms/Button";
import { ReactSVG } from "react-svg";
import EmptyCart from "Images/Icons/shopping-cart-empty.svg";
import Api from "Helpers/api";

import OrderProductCard from "Components/Order/OrderProductCard";
const api = new Api();
const OrderCart =({Cart}) => {
  let CartData = JSON.stringify(Cart);
  CartData = JSON.parse(CartData);
  const [cartItems , setCartItems] = useState();
  const getCartItems = () => {
    const promises = CartData.map((item, i) => api.getProductOption(item.pk).then(data => {
      return data.data;
    }));

    // resolve all the api calls in parallel and populate the messageData object as they resolve
    Promise.all(promises).then(responses => {
        setCartItems(responses);
    });
  }

  useEffect(() => {
    console.log(JSON.stringify(Cart));
    if(CartData){
      if(!cartItems){
        getCartItems(); 
      }else{
        if(cartItems.length !== CartData.length){
          getCartItems(); 
        }
      } 
    } 
  });

  return useObserver(() => (
    <>
      <div className="flex-grow flex flex-col overflow-hidden">
      <div className="p-3 my-4 overflow-y-scroll">
        {cartItems && (
          cartItems.map(item => {
            
            return(<OrderProductCard product={item}/>)
          })
        )}
      </div>
        {!cartItems && (
            <>
            <ReactSVG
              src={EmptyCart}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "display:block;margin:auto");
              }}
            ></ReactSVG>
            <p className="text-base text-betterfit-grey-blue text-center">
              No products added
            </p>
            </>
        )}
      </div>
      <div className="flex flex-row space-x-2">
        <Button text="Save Draft" solid={false} text_size="text-sm" />
        <Button text="Submit Order" text_size="text-sm" />
      </div>
    </>
  ));
};

export default OrderCart;
