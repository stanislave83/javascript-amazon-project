import{deliveryOptions}from'./deliveryOptions.js';

function Cart(localStorageKey){
  const cart={
    cartItems:undefined,
  
    loadFromStorage(){
      this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));
    
      if(!this.cartItems){
        this.cartItems=[{
          productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity:2,
          deliveryOptionId:'1'
        },{
          productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity:1,
          deliveryOptionId:'2'
        }];
      }
    },
  
    saveToStorage(){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },
  
    addToCart(productId,quantity){
      let matchingItem;
      this.cartItems.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });
    
      if(matchingItem){
        matchingItem.quantity+=quantity;
      }else{
        this.cartItems.push({
          productId,
          quantity:1,
          deliveryOptionId:'1'
        })
      }
      this.saveToStorage();
    },
  
    removeFromCart(productId){
      const newCart=[];
    
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
          newCart.push(cartItem);
        }
      })
    
      this.cartItems=newCart;
      this.saveToStorage();
    },
  
    calculateCartQuantity(){
      let cartQuantity=0;
      this.cartItems.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;
      });
      //console.log(cartQuantity)
      return cartQuantity;
      //console.log(cart)
    },
  
    updateQuantity(productId,newQuantity){
      if(newQuantity>0&&newQuantity<1000){
        let newNewQuantity;
        this.cartItems.forEach((cartItem)=>{
          if(productId===cartItem.productId){
            newNewQuantity=cartItem;
          }
        })
        newNewQuantity.quantity=newQuantity;
        this.saveToStorage();
      }else{
        alert('Invalid value');
        return -1;
      }
    },
  
    updateDeliveryOption(productId,deliveryOptionId){
      let matchingItem;
      let matchingDeliveryIds;
      this.cartItems.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });
      deliveryOptions.forEach((deliveryOption)=>{
        if(deliveryOptionId===deliveryOption.id){
          matchingDeliveryIds=deliveryOptionId;
        }
      })
    
      if(!matchingItem){
        return;
      }
      if(!matchingDeliveryIds){
        return;
      }
      matchingItem.deliveryOptionId=deliveryOptionId;
      this.saveToStorage();
    }
  };
  return cart;
}

const cart=Cart('cart-oop');
const businessCart=Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)