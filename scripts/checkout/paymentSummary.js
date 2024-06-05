import {cart} from '../../data/cart.js';
import { getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';
//starting from here it is model(saving data)
export function renderPaymentSummary() {
  let productPriceCents = 0;

  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
 
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1; // 0.1 is 10/100
  const totalCents = totalBeforeTaxCents + taxCents;

//starting from here it is view (generating through html)
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
      $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
    js-place-order">
      Place your order
    </button>
      `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async() => { //await can only be used with async function do before arrow function used async.
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST', //Type of the request
        headers: { //Gives more information about our request
          'Content-Type': 'application/json'//What type of data we are sending to back end
        },
        body: JSON.stringify({ //Actual data sending to an object with a property called cart And we cant give object direct to the backend so we Convert it into adjacent string.
          cart: cart //cart is property and 2nd cart is cart array
        })
      });
      
      const order = await response.json(); //response is also promise so we use await to wait before going to the next line.
      addOrder(order);

      } catch (error) {
        console.log('Unexpected error. Try again later.')
      }
      //After creating an order, we will go to the orders page using window.location, Which helps us control URL.
      window.location.href = 'orders.html';//window.location is JS special object and location has property called href, which give url at the top of the page.
    });
}

//starting from here it is controller (making things interactive)