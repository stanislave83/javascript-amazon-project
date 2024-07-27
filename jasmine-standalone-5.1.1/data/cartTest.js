import{addToCart,cart,loadFromStorage,removeFromCart,updateDeliveryOption}from'../../data/cart.js';
//import{deliveryOptions}from'../../data/deliveryOptions.js';

describe('test suite: addToCart',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
  })


  it('adds an existing product to the cart',()=>{

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:'1'
      }]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    /*
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:'1'
    }]));
    expect(cart[0].quantity).toEqual(1);
    */
  });


  it('adds a new product to the cart',()=>{

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryOptionId:'1'
    }]));
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('test suite: removeFromCart',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:'1'
      }]);
    });
    loadFromStorage();
  });
  it('removes an existing product from the cart',()=>{
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));
  });
  it('removes a non-existing product from the cart',()=>{
    removeFromCart('47812346781481647851841946128');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryOptionId:'1'
    }]));
  });
});

describe('test suite: updateDeliveryOption',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:'1'
      }]);
    });
    loadFromStorage();
  });

  it('basic test',()=>{
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','3');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('edge test',()=>{
    updateDeliveryOption('12312314141414124','3');
    expect(cart).toEqual([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryOptionId:'1'
    }]);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('edge test 2',()=>{
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','16');
    expect(cart).toEqual([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryOptionId:'1'
    }]);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});