import { observer } from "mobx-react";

export function createCartStore (){
    return{
        cart:[],
        addToCart(item,quantity){
            let newObj = {
                "pk" : item,
                "quantity" : quantity
            }
            const checkProduct = obj => obj.pk === newObj.pk;
            if(!this.cart.some(checkProduct)){
                this.cart = [
                    ...this.cart,
                    newObj
                ];
                this.updateLocalCartStorage();
            }
        },
        removeFromCart(item,quantity){
            let newObj = {
                "pk" : item,
                "quantity" : quantity
            }
            const checkProduct = obj => obj.pk === newObj.pk;
            if(!this.cart.some(checkProduct)){
                this.cart = [
                    ...this.cart,
                    newObj
                ];
                this.updateLocalCartStorage();
            }
        },
        updateLocalCartStorage() {
            localStorage.setItem("cart",JSON.stringify(this.cart));
        },
        getLocalCartStorage(){
            // localStorage.removeItem("cart")
            let cartData = localStorage.getItem("cart");
            if(cartData){
                this.cart = JSON.parse(cartData);
            }else{
                this.cart = [];
            }
        } 
    }
}