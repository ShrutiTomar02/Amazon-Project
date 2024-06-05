export 
const deliveryOptions = [{
  id: '1', //delivery option 1
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2', //delivery option 2
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3', //delivery option 3
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption;
}