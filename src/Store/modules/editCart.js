import { observable, action, reaction, computed } from 'mobx';

export default class editCartStore {
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
        localStorage.setItem("editCart",JSON.stringify(this.cart));
    }   
    @action getLocalCartStorage = () => {
        let cartData = localStorage.getItem("editCart");
        if(cartData){
            this.cart = JSON.parse(cartData);
        }else{
            this.cart = [];
        }
    } 
}
