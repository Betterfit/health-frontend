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
        importCart(items) {
          items.map((item) => {
              this.addToCart(item.pk, item.quantity)
          });
        },
        clearCart() {
          let arr = [];
          this.cart = arr;
        },
        removeFromCart(id){
            let arr = JSON.stringify(this.cart);
            arr = JSON.parse(arr);
            arr = arr.filter(item => item.pk !== parseInt(id));
            this.cart = arr;
        },
        updateItemQuantity(id,quantity){
            let arr = JSON.stringify(this.cart);
            arr = JSON.parse(arr);
            for (var i in arr) {
                if (arr[i].pk == id) {
                    console.log('found');
                   arr[i].quantity = parseInt(quantity);
                   break; //Stop this loop, we found it!
                }
            }
            this.cart = arr;
            this.updateLocalCartStorage();
        },
        updateItemPriority(id,priority){
            let arr = JSON.stringify(this.cart);
            arr = JSON.parse(arr);
            for (var i in arr) {
                if (arr[i].pk == id) {
                    console.log('found');
                   arr[i].priority = priority;
                   break; //Stop this loop, we found it!
                }
            }
            this.cart = arr;
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
