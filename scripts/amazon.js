//put all imports at the top of the file and for modules to work we need to use live srever.
import {cart, addToCart} from '../data/cart.js'; 
import{products, loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid); 
//functions are value so we can use it as a parameter.So what we are doing here is we are running all these code inside a function renderproductsgrid after loadingproducts, so we use this function as a parameter and load products in order to run this function after loading.
function renderProductsGrid() { 
  let productsHTML = '';
  //we are looping through the array of products And for each product we're creating all the html that we had before so we're generating this html using javascript.

  //products.forEach((product) => {
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;

    // If a search exists in the URL parameters,
   // filter the products that match the search.
    if (search) {
      filteredProducts = products.filter((product) => {
        //return product.name.includes(search);
        let matchingKeyword = false;// no keyword matches search query.

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div> 

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary
        js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
    // when you access a data attribute in JavaScript, the browser automatically converts the kebab-case HTML attribute into camelCase. For example, data-product-id in HTML becomes productId in JavaScript when accessed via the dataset property.
  });

  document.querySelector('.js-products-grid').
    innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
      });
    });

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      //Value is a property used to retrieve the text entered into this input field search bar by the user
      window.location.href = `amazon.html?search=${search}`;
    });
}
