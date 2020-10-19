import { observable, action, reaction, computed } from 'mobx';

export default class cartStore {
    @observable cart = [];
 
    @action addToCart = (item,quantity) => {
        let obj = {
            "pk" : item,
            "quantity" : quantity
        }
        this.cart = [
            ...this.cart,
            obj
        ];
        console.log(this.cart);
        this.updateLocalCartStorage();

    }
    @action updateLocalCartStorage = () => {
        localStorage.setItem("cart",this.cart);
    }   
}
