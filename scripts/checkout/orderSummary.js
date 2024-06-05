import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
//dayjs is default export, used when we only want to export 1 thing and above 3 imports are called named export.
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

/*dayjs is in lowercase because that's the name library used.
const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM, D'));
This string tells us what kind of format we want to display the date.
*/

export function renderOrderSummary() {
  let cartSummmaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM, D'
    );

    cartSummmaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          ${dateString}
        </div>
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">
    
            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity
              js-product-quantity-${matchingProduct.id}">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link
                  js-delete-link-${matchingProduct.id}" 
                  data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
            
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>  
          </div>
        </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, 
  cartItem) {
  //this variable ${matchingProduct.id}is not accessible inside this function so we pass the matchingProduct into its parameter.
    let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM, D'
    );

    const priceString = deliveryOption.priceCents 
    === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;
    //above is the ternary operator. 

    const isChecked = deliveryOption.id === 
    cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
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
    `;
  });
  return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummmaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);//update the data
        
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
          container.remove();

         renderPaymentSummary();
        //When we click delete we're going to update data and then regenerate all the Html using render payment summary, so it will update payment as well.    
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => { //calling each of the options as element.
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset; //Out of the data attributes we are going to get the productId and deliveryOptionId.
        updateDeliveryOption(productId, deliveryOptionId);//update the data
        renderOrderSummary();
 //In this first we update the data and then we regenerate all the HTML This is called mvc model view controller. 
        renderPaymentSummary();
      });
    });
}

