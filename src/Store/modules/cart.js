import { observable, action, reaction, computed } from 'mobx';

export default class cartStore {
    @observable cart = localStorage.getItem('cart') ?  localStorage.getItem('cart') : [];
 
    @action addToCart = (item) => {
        this.cart.push(item)
    }
}
