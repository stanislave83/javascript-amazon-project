import{renderOrderSummary}from'../../scripts/checkout/orderSummary.js';
import{loadFromStorage,cart}from'../../data/cart.js';
import{renderPaymentSummary}from'../../scripts/checkout/paymentSummary.js';

describe('test suite: renderOrderSummary',()=>{
  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';
  //const deliveryOptionId1='1';
  //const deliveryOptionId2='2';
  const deliveryOptionId3='3';

  beforeEach(()=>{
    spyOn(localStorage,'setItem')

    document.querySelector('.test-checkout').innerHTML=`
      <div class="header-content"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:productId1,
        quantity:2,
        deliveryOptionId:'1'
      },{
        productId:productId2,
        quantity:1,
        deliveryOptionId:'2'
      }]);
    });
    loadFromStorage();
    renderOrderSummary();
    renderPaymentSummary();
  });

  afterEach(()=>{
    document.querySelector('.test-checkout').innerHTML='';
  });


  it('displays the cart',()=>{
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');
  })

  it('removes a product',()=>{
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(document.querySelector(`.js-product-name-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-product-name-${productId2}`)).not.toEqual(null);
  });

  it('tests input',()=>{
    document.querySelector(`.js-delivery-option-${productId1}-${deliveryOptionId3}`).click();
    expect(document.querySelector(`.js-delivery-option-input-${productId1}-${deliveryOptionId3}`).checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(document.querySelector(`.js-shipping`).innerText).toContain('$14.98');
    expect(document.querySelector(`.total-row`).innerText).toContain('$63.50');
  });
});
  