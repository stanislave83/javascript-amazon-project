import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart-class.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage(){
  await loadProductsFetch();

  const value = await new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value3');
    });
  })

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
/*
Promise.all([
  loadProductsFetch(),
  

]).then(( values)=>{
  console.log(values)
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');
  });

}).then((value)=>{
  console.log(value);

  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/
// flatter code

/*
loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
// nestted code