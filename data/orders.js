export const orders =JSON.parse(localStorage.getItem('orders')) || [];
//order object that we add to array
export function addOrder(order) {
  orders.unshift(order)
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}

