import { observable, action, reaction, computed } from 'mobx';

export default class authStore {
    constructor() {
    }
  @observable token = localStorage.getItem('token');  
  @observable userData = localStorage.getItem("user") ? localStorage.getItem("user")  : null ;
}
