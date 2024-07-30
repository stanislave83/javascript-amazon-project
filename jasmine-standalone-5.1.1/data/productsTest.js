import { Product,Clothing,Appliance } from '../../data/products.js';

describe('test suite: testing new classes',()=>{
  it('class Product',()=>{
    const testObject = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });
    expect(testObject.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(testObject.priceCents).toEqual(1090);
    expect(testObject.getPrice()).toEqual('$10.90');
    expect(testObject.extraInfoHTML()).toEqual('');
  });
  it('class Clothing',()=>{
    const testObject = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
    expect(testObject.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(testObject.priceCents).toEqual(799);
    expect(testObject.getPrice()).toEqual('$7.99');
    expect(testObject.extraInfoHTML()).toContain('images/clothing-size-chart.png');
  });
  it('class Appliance',()=>{
    const testObject = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    });
    expect(testObject.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(testObject.priceCents).toEqual(1899);
    expect(testObject.getPrice()).toEqual('$18.99');
    expect(testObject.extraInfoHTML()).toContain('images/appliance-instructions.png');
    expect(testObject.extraInfoHTML()).toContain('images/appliance-warranty.png');
  });
});