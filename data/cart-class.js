class Cart {
  cartItems;//this is short cut for undefined
  #localStorageKey;//# makes property private which means it is only accessible inside the class, without # is public property and can be accessed from anywhere.

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;//"this" refers to object.
    this.#loadFromStorage();
  }
  //Each object that we create is gonna run the constructor so we only need one of each lines, hence cut busineesCart from both the lines.

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  //If the cart is empty we'll give it a default value given below.
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }  
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity ++;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
    //Whenever we update the cart we need to save it to local storage.
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
    //Whenever we update the cart we need to save it to local storage.
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }
}
//Each object we generate from the class is called instance of the class.
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
//This will check if businessCart object is generated from the class cart
console.log(businessCart instanceof Cart);


 
