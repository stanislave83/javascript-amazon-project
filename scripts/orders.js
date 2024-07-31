import { orders } from "../data/orders.js";
import { cart } from "../data/cart-class.js";
import { products,loadProductsFetch } from "../data/products.js";
import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js'


loadPage();

async function loadPage(){
  await Promise.all([
    loadProductsFetch()
  ]);
  renderOrderHTML();
}

export function resetTheCart(){
  cart.cartItems = [];
  cart.saveToStorage();
  // console.log(cart);
}

function renderOrderHTML(){

  console.log(orders);
  function renderOrderHeader(){

    let allCount = cart.loadFromStorage()||0;
    function countAllQuantity(){
      cart.cartItems.forEach((cartItem)=>{
        allCount+=cartItem.quantity
      })
      
    }
    countAllQuantity()
    // console.log(cart)

    const orderHeaderHTML =
      `
        <div class="amazon-header-left-section">
          <a href="amazon.html" class="header-link">
            <img class="amazon-logo"
              src="images/amazon-logo-white.png">
            <img class="amazon-mobile-logo"
              src="images/amazon-mobile-logo-white.png">
          </a>
        </div>

        <div class="amazon-header-middle-section">
          <input class="search-bar" type="text" placeholder="Search">

          <button class="search-button">
            <img class="search-icon" src="images/icons/search-icon.png">
          </button>
        </div>

        <div class="amazon-header-right-section">
          <a class="orders-link header-link" href="orders.html">
            <span class="returns-text">Returns</span>
            <span class="orders-text">& Orders</span>
          </a>

          <a class="cart-link header-link" href="checkout.html">
            <img class="cart-icon" src="images/icons/cart-icon.png">
            <div class="cart-quantity">${allCount}</div>
            <div class="cart-text">Cart</div>
          </a>
        </div>
      `
    document.querySelector('.amazon-header').innerHTML=orderHeaderHTML;
  }

  let orderMainHTML='';
  
  function renderOrderContainers(){
    orders.forEach((orderItem)=>{

      // DATE
      const isoString = orderItem.orderTime;
      const dateFromString = dayjs(isoString);
      const finalDate = dateFromString.format('MMMM D');
      // Outputs: Thu Oct 05 2023 14:48:00 GMT+0000 (Coordinated Universal Time)
      // DATE


      // COST
      const priceCents = Number(orderItem.totalCostCents)/100;
      // COST
      

      orderMainHTML+=
        `
          <div class="order-container js-order-container-${orderItem.id}">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${finalDate}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${priceCents}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${orderItem.id}</div>
              </div>
            </div>

            <div class="order-details-grid js-order-details-grid-${orderItem.id}"></div>
          </div>
        `
      document.querySelector('.orders-grid').innerHTML=orderMainHTML;
    })
  }

  let matchingItem1;
  let matchingItem2;

  function renderOrderItems(){
    orders.forEach((orderItem)=>{
      let orderMainInnerHTML='';
      // console.log(orderItem.products)
      
      orderItem.products.forEach((product)=>{
        
        // console.log(products)
        // console.log(product.productId)
        // console.log(products)
        products.forEach((product1)=>{
          if(product.productId===product1.id){
            matchingItem1 = product1
            matchingItem2 = product
            // console.log(matchingItem1)
            // console.log(matchingItem2)
          }
        })
        // console.log(matchingItem)

        // DATE
        const isoString = matchingItem2.estimatedDeliveryTime;
        const dateFromString = new Date(isoString);
        const options = { day: 'numeric',month: 'long' };
        const finalDate = dateFromString.toLocaleDateString("en-US", options); 
        // Outputs: Thu Oct 05 2023 14:48:00 GMT+0000 (Coordinated Universal Time)
        // DATE

        orderMainInnerHTML+=
          `
            <div class="product-image-container">
              <img src="${matchingItem1.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
              ${matchingItem1.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${finalDate}
              </div>
              <div class="product-quantity">
                Quantity: ${matchingItem2.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchingItem1.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderItem.id}&productId=${matchingItem1.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `
        // console.log(matchingItem2.quantity)

      })
      document.querySelector(`.js-order-details-grid-${orderItem.id}`).innerHTML=orderMainInnerHTML;
    })
  }
  
  renderOrderHeader();
  renderOrderContainers();
  renderOrderItems();
  
  document.querySelectorAll('.js-buy-again-button')
    .forEach((button)=>{
      button.addEventListener('click',()=>{
        const {productId} = button.dataset;
        const quantity=1
        cart.addToCart(productId,quantity);
        console.log(cart)
        cart.saveToStorage();
        renderOrderHeader();
      })
    })

  
}