import {cart}from'../../data/cart-class.js'
import{products,getProducts}from'../../data/products.js'
import formatCurrency from'../utils/money.js'
// import{hello}from'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import{deliveryOptions,getDeliveryOption,calculateDeliveryDate}from'../../data/deliveryOptions.js'
import{renderPaymentSummary}from'./paymentSummary.js'
import{renderCheckoutHeader}from'./checkoutHeader.js'

// hello()
// const today=dayjs()
// const deliveryDate=today.add(7,'days')
// console.log(deliveryDate.format('dddd, MMMM D'));


export function renderOrderSummary(){

  let cartSummaryHTML='';
  cart.cartItems.forEach((cartItem)=>{
    const {productId}=cartItem;

    const matchingProduct=getProducts(productId)

    const deliveryOptionId=cartItem.deliveryOptionId;

    const deliveryOption=getDeliveryOption(deliveryOptionId);

    const dateString=calculateDeliveryDate(deliveryOption);

    cartSummaryHTML+=`
      <div class="cart-item-container js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link js-update-link link-primary" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
    `;
  })

  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html='';
    deliveryOptions.forEach((deliveryOption)=>{
      const dateString=calculateDeliveryDate(deliveryOption);
      const priceString=deliveryOption.priceCents===0
        ?'FREE'
        :`$${formatCurrency(deliveryOption.priceCents)} -`

      const isChecked=deliveryOption.id===cartItem.deliveryOptionId;
      html+=
      `
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked?'checked':''}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    })
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        const {productId}=link.dataset;
        cart.removeFromCart(productId);

        renderCheckoutHeader();
        renderOrderSummary();
        updateCartQuantity();
        renderPaymentSummary();
      })
    })

  document.querySelectorAll('.js-update-link')
    .forEach((link2)=>{
      link2.addEventListener('click',()=>{
        const {productId}=link2.dataset;
        const container=document.querySelector(`.js-cart-item-container-${productId}`)
        container.classList.add('is-editing-quantity');
      })
    })


  document.querySelectorAll('.save-quantity-link')
    .forEach((link3)=>{
      link3.addEventListener('click',()=>{
        const {productId}=link3.dataset;
        const inputQuantity=document.querySelector(`.js-quantity-input-${productId}`);
        let newQuantity=Number(inputQuantity.value)
        
        cart.updateQuantity(productId,newQuantity)
        renderCheckoutHeader();
        updateCartQuantity();
        renderOrderSummary();
        renderPaymentSummary();
        if(cart.updateQuantity(productId,newQuantity)===-1){
          return;
        }else{
          const container=document.querySelector(`.js-cart-item-container-${productId}`)
          container.classList
            .remove('is-editing-quantity');
        }
      })
    })

  document.querySelectorAll('.quantity-input')
    .forEach((save)=>{
      save.addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){
          const {productId}=save.dataset;
          const inputQuantity=document.querySelector(`.js-quantity-input-${productId}`);
          let newQuantity=Number(inputQuantity.value)
          
          cart.updateQuantity(productId,newQuantity)
          renderCheckoutHeader();
          updateCartQuantity();
          renderOrderSummary();
          renderPaymentSummary();
          if(cart.updateQuantity(productId,newQuantity)===-1){
            return;
          }else{
            const container=document.querySelector(`.js-cart-item-container-${productId}`)
            container.classList
              .remove('is-editing-quantity');
          }
        }
      })
    });

  updateCartQuantity();
  function updateCartQuantity(){
    const cartQuantity=cart.calculateCartQuantity();
    renderCheckoutHeader();
    document.querySelector('.js-cart-quantity')  
      .innerHTML=`${cartQuantity} items`;
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId,deliveryOptionId}=element.dataset;
        cart.updateDeliveryOption(productId,deliveryOptionId)
        renderOrderSummary()
        renderPaymentSummary();
      })
    })

  /*
  function updateCheckOut(){
    let checkOutItems=0;
    cart.forEach((cartItem)=>{
      checkOutItems+=cartItem.quantity;
    });
    document.querySelector('.js-checkout-header-middle-section').innerText=`${checkOutItems} items`;
    
    const itemItems1=`${checkOutItems} item`;
    const itemItems2=`${checkOutItems} items`;
    if(checkOutItems===1){
      document.querySelector('.js-checkout-header-middle-section').innerText=itemItems1;
    }else{
      document.querySelector('.js-checkout-header-middle-section').innerText=itemItems2;
    }
  }
  */
}
