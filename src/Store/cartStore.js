export function createCartStore (){
    return{
        cart:[],
        newOrderName:"",
        addToCart(item,quantity,priority){
            let newObj = {
                "pk" : item,
                "quantity" : quantity,
                "priority": priority
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
        removeFromCart(id){
            let arr = JSON.stringify(this.cart);
            arr = JSON.parse(arr);
            arr = arr.filter(item => item.pk !== parseInt(id));
            this.cart = arr;
            this.updateLocalCartStorage();
        },
        updateItemQuantity(id,quantity){
            let arr = JSON.stringify(this.cart);
            arr = JSON.parse(arr);
            for (var i in arr) {
                if (arr[i].pk == id) {
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
                   arr[i].priority = priority;
                   break; //Stop this loop, we found it!
                }
            }
            this.cart = arr;
            this.updateLocalCartStorage();
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