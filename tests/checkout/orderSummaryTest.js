//This is called integration test, test many units/pieces of code working together.And Lets us first test how our page looks and how it behaves
import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from '../../data/cart.js';
import {loadProducts, loadProductsFetch} from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
 //beforeEach will run this function before each test, so inside this Function we can put our setup code so we do not repeat it in each test.This is a great way to share code between tests and remove duplication.

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeAll((done) => {//done is a Function Provided byJasmine Which waits for the products to load just like fun in product.js and then it will go to next code.
    loadProductsFetch().then(() => {
      done();
    });
    //If we dont call done it will keep on waiting forever so calling done lets us control when to go to the next step.
  });


  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div> 
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
    //we emptied this string in order to delete the the generated html so that we see the test results clearly.
  });

  it('displays the cart', () => {
    
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
      expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
      ).toContain('Quantity: 2');

      expect(
        document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain('Quantity: 1');
  });

  it('removes a product', () => {
    
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);//It cheques whether there are two items in the cart items.
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);//to check if item 1 is deleted.
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);// check if the item 2 is there in the cart.
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});