import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCartFetch } from '../data/cart-class.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage(){
  await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
  ]);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
async function loadPage(){
  try{
    // throw 'error1';
    await loadProductsFetch();

    const value = await new Promise((resolve,reject)=>{
      // throw 'error2';
      loadCartFetch(()=>{
        // reject('error3')
        resolve('value3');
      });
    });
  }catch(error){
    console.log('Unexpected error. Please try again later');
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
*/

/*
Promise.all([
  loadProductsFetch(),
  

]).then((values)=>{
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