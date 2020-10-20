import React, {useState,useEffect} from "react";
import { useObserver} from "mobx-react"
import Button from "Components/Forms/Button";
import { ReactSVG } from "react-svg";
import EmptyCart from "Images/Icons/shopping-cart-empty.svg";
import Api from "Helpers/api";
import Modal from "Components/Content/Modal";

import OrderProductCard from "Components/Order/OrderProductCard";
const api = new Api();
const OrderCart =({Cart}) => {
  let CartData = JSON.stringify(Cart);
  CartData = JSON.parse(CartData);
  const [cartItems , setCartItems] = useState();
  const [modalOrder , setModalOrder ] = useState(false);
  const [modalDraft , setModalDraft ] = useState(false);

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


  const confirmCallBack = () => {
    // let arr = ticketDataRaw;
    // arr.status = "shipped";
    // let obj = {
    //     "status":"shipped"
    // }
    // api.setUpdateTicket(supplierId,ticketDataRaw.pk,obj).then((response)=>{
    //     getData();
    //     setModal(!modal);
    // }).catch(error => {
    //     console.error('Error', error);
    // });
    setModalOrder(false)
    setModalDraft(false)
  }



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
        <Button text="Save Draft" solid={false} text_size="text-sm" onClick={() => setModalDraft(!modalOrder)} />
        <Button text="Submit Order" text_size="text-sm" onClick={() => setModalOrder(!modalOrder)} />
      </div>
      <>
        {modalOrder && (
            <Modal  cancelCallBack ={() => setModalOrder(!modalOrder)} confirmCallBack = {confirmCallBack} buttonText="Place Order">
                <div className="px-6 py-4 border-b border-gray-300">
                    <h2 className="text-betterfit-navy text-xl">Confirm Order</h2>
                </div>
                <div className="py-6 px-6">
                  <p className="text-paragraph text-base">Are you sure you’re ready to submit this order? 
                  Would you like to add a purchase order to it? </p>
                </div>
            </Modal> 
        )}
      </> 
      <>
        {modalDraft && (
            <Modal  cancelCallBack ={() => setModalDraft(!modalDraft)} confirmCallBack = {confirmCallBack} buttonText="Save Draft">
                <div className="px-6 py-4 border-b border-gray-300">
                    <h2 className="text-betterfit-navy text-xl">Save as Draft</h2>
                </div>
                <div className="py-6 px-6">
                  <p className="text-paragraph text-base">Would you like to add a purchase order to it?</p>
                </div>
            </Modal> 
        )}
      </> 
    </>
  ));
};

export default OrderCart;
