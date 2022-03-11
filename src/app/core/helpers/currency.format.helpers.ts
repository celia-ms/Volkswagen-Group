export function getCurrencyFormat(price: any) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  })
    .format(Number(price))
    .replace(/\D00(?=\D*$)/, '');
}
