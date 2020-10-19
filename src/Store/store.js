// importing observables and decorate
import { decorate, observable, action } from "mobx";
import {observer} from "mobx-react"
import authStore from './modules/auth'
import cartStore from './modules/cart'
class Store {
    // observable to save search query
    constructor(){
      this.authStore = new authStore(this);
      this.cartStore = new cartStore(this);
    } 
}

  // export class
  export default new Store();