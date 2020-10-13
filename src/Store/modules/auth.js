import { observable, action, reaction, computed } from 'mobx';

export default class authStore {
    constructor() {
    }
    
  @observable userData = "Tyler";
}
