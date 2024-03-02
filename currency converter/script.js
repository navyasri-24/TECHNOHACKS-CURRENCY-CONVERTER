/* jshint esversion: 6 */
function convert() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultElement = document.getElementById('result');

  if (isNaN(amount)) {
      resultElement.textContent = "Please enter a valid amount.";
      return;
  }

  // Fetch exchange rates from API
  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch exchange rates.');
          }
          return response.json();
      })
      .then(data => {
          if (!data || !data.rates || !data.rates[toCurrency]) {
              throw new Error('Exchange rate data is invalid.');
          }
          const exchangeRate = data.rates[toCurrency];
          const result = (amount * exchangeRate).toFixed(2);
          resultElement.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
      })
      .catch(error => {
          console.error('Error fetching exchange rates:', error);
          resultElement.textContent = 'Error fetching exchange rates. Please try again later.';
      });
}
