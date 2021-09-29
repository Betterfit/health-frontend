export function createCartStore(name = "cart") {
  return {
    cartType: name,
    cart: [],
    newOrderName: "",
    addToCart(item, quantity, priority, product_pk) {
      console.log(item, quantity, priority);
      let newObj = {
        pk: item,
        product_pk: product_pk,
        quantity: quantity,
        priority: priority,
      };
      const checkProduct = (obj) => obj.pk === newObj.pk;
      if (!this.cart.some(checkProduct)) {
        this.cart = [...this.cart, newObj];
        this.updateLocalCartStorage();
      }
    },
    removeFromCart(id) {
      let arr = JSON.stringify(this.cart);
      arr = JSON.parse(arr);
      arr = arr.filter((item) => item.pk !== parseInt(id));
      this.cart = arr;
      this.updateLocalCartStorage();
    },
    updateItemQuantity(id, quantity) {
      let arr = JSON.stringify(this.cart);
      arr = JSON.parse(arr);
      for (var i in arr) {
        if (arr[i].pk === id) {
          arr[i].quantity = parseInt(quantity);
          break; //Stop this loop, we found it!
        }
      }
      this.cart = arr;
      this.updateLocalCartStorage();
    },
    importCart(items) {
      items.forEach((item) => {
        this.addToCart(item.pk, item.quantity, item.priority, item.product_pk);
      });
    },
    clearCart() {
      let arr = [];
      this.cart = arr;
      this.updateLocalCartStorage();
    },
    updateItemPriority(id, priority) {
      let arr = JSON.stringify(this.cart);
      arr = JSON.parse(arr);
      for (var i in arr) {
        if (arr[i].pk === id) {
          arr[i].priority = priority;
          break; //Stop this loop, we found it!
        }
      }
      this.cart = arr;
      this.updateLocalCartStorage();
    },
    updateLocalCartStorage() {
      localStorage.setItem(name, JSON.stringify(this.cart));
    },
    getLocalCartStorage() {
      let cartData = localStorage.getItem(name);
      if (cartData) {
        this.cart = JSON.parse(cartData);
      } else {
        this.cart = [];
      }
    },
  };
}
