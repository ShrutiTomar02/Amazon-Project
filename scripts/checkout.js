import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
//import '../data/cart-class.js'; 
//above is another syntax we can use for import
//mport '../data/backend-practice.js';

async function loadPage() {//async makes a function return a promise
  try { 
    //throw 'error1';
    await loadProductsFetch();//load products. wrapped around a promise.

    const value = await new Promise((resolve, reject) => {//load cart.
      //throw 'error2'; //directly go to catch (error) instead of .catch((error) => {}); when await is used inside a promise
      loadCart(() => {
        //reject('error3');
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('unexpected error. Please try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*Promises are a better way to wait for the asynchronous code to finish Promise is a class and inside the class we give it a function also resolve is a function we write it inside parameter and it works similar to done function of Jasmine. then is used for creating another step. Whatever value that we want to give to resolve we can save that value in .then parameter it's a feature of promise. Another feature of promise is Promise.all() - it lets us run multiple promises at the same time so we can run loadproducts and loadcart at the same time and wait for all of them to finish.

Promise.all([//array of promises.
  loadProductsFetch(),//this is will return a promise and then we can use it with promise.all
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }) 

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/* await with promise.all()
async function loadAll() {
   Promise.all ([
    await loadProductsFetch(),
    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    })
  ]);

  renderOrderSummary();
  renderPaymentSummary();
}
loadAll();
*/

/* this is promise 
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value1) => { 
  console.log(value1);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*this is callback method which can be used for small projects
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
