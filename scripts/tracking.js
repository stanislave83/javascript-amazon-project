import { cart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { products,loadProductsFetch } from "../data/products.js";
import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js'


loadPage();

async function loadPage(){
  await Promise.all([
    loadProductsFetch()
  ]);
  renderTrackingHTML();
}

function renderTrackingHTML(){

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId')
  const productId = url.searchParams.get('productId')

  function renderTrackingHeader(){

    let allCount = cart.loadFromStorage()||0;
    function countAllQuantity(){
      cart.cartItems.forEach((cartItem)=>{
        allCount+=cartItem.quantity
      })
      
    }
    countAllQuantity()

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
  let globalTime;
  let globalName;
  let globalImage;
  let globalQuantity;
  let globalProcess;
  function renderTrackingMain(){

    orders.forEach((orderItem)=>{
      // console.log(orderItem.id)
      orderItem.products.forEach((product)=>{
        // console.log(product.estimatedDeliveryTime)
        // console.log(product)
        if(productId===product.productId&&orderId===orderItem.id){
          // if(productId===)
          // DATE
          const isoString = dayjs(product.estimatedDeliveryTime);
          const dateFromString = isoString.format('MMMM D')
          globalTime = dateFromString 
          // Outputs: Thu Oct 05 2023 14:48:00 GMT+0000 (Coordinated Universal Time)
          // DATE
          // console.log(finalDate)

          const orderTime = orderItem.orderTime
          const orderTimeNew = dayjs(orderTime)
          // const orderTimeNewNew = orderTimeNew.format('dddd, MMMM D YYYY')
          // console.log(orderTimeNewNew)
          const today = dayjs()
          // const dateFromStringNew = isoString.format('MMMM D YYYY')
          // const todayNew = today.format('dddd, MMMM D YYYY')
          // console.log(todayNew)
          // console.log(dateFromStringNew)
          const whole = isoString.diff(orderTimeNew, 'minute');
          const passed = today.diff(orderTimeNew, 'minute');
          const process = (passed/whole)*100

          globalProcess = process
          // console.log(globalProcess)

          // console.log(passed);
          // console.log(whole);
          // console.log(passed/whole);

          globalQuantity = product.quantity;
          // console.log(product.quantity)
          
          products.forEach((prod)=>{
            if(productId===prod.id){
              globalName = prod.name;
              globalImage = prod.image;
            }
          })
        }
      })
      
    })
    orderMainHTML+=
      `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${globalTime}
        </div>

        <div class="product-info">
          ${globalName}
        </div>

        <div class="product-info">
          Quantity: ${globalQuantity}
        </div>

        <img class="product-image" src="${globalImage}">

        <div class="progress-labels-container">
          <div class="progress-label ${
            globalProcess<50?'current-status':''
          }">
            Preparing
          </div>
          <div class="progress-label ${
            (globalProcess>=50&&percentProgress<100)?'current-status':''
          }">
            Shipped
          </div>
          <div class="progress-label ${
            globalProcess>=100?"current-status":''
          }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${globalProcess}%;"></div>
        </div>
      `
    document.querySelector('.order-tracking').innerHTML=orderMainHTML;
  }

  renderTrackingHeader();
  renderTrackingMain();
}