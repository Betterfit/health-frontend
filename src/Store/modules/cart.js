import { observable, action, reaction, computed } from 'mobx';

export default class cartStore {
    @observable cart;
    
    @action addToCart = (item,quantity) => {
        let obj = {
            "pk" : item,
            "quantity" : quantity
        }
        this.cart = [
            ...this.cart,
            obj
        ];
        this.updateLocalCartStorage();
    }
    @action updateLocalCartStorage = () => {
        localStorage.setItem("cart",JSON.stringify(this.cart));
    }   
    @action getLocalCartStorage = () => {
        let cartData = localStorage.getItem("cart");
        if(cartData){
            this.cart = JSON.parse(cartData);
        }else{
            this.cart = [];
        }
    } 
}
