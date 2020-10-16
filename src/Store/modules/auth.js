import { observable, action, reaction, computed } from 'mobx';

export default class authStore {
    constructor() {
    }
    
  @observable userData = localStorage.getItem("user") ? localStorage.getItem("user")  : null ;
}
