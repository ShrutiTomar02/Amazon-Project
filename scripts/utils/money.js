export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
// Tofix method has some issue with rounding so for some number ending with 5 it won't round correctly hence we Round priceCents so that(toFixed) method doesn't have to do any rounding.
}

export default formatCurrency;