export function createCartStore (){
    return{
        cart:[],
        addToCart(item,quantity){
            let obj = {
                "pk" : item,
                "quantity" : quantity
            }
            this.cart = [
                ...this.cart,
                obj
            ];
            this.updateLocalCartStorage();
        },
        updateLocalCartStorage() {
            localStorage.setItem("cart",JSON.stringify(this.cart));
        },
        getLocalCartStorage(){
            let cartData = localStorage.getItem("cart");
            if(cartData){
                this.cart = JSON.parse(cartData);
            }else{
                this.cart = [];
            }
        } 
    }
}