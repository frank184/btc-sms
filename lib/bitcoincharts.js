request = require('request')

var BTC_EXCHANGE_RATE;

Bitcoincharts = {
  // Functions
  __getExchangeRates: function() {
    request('http://api.bitcoincharts.com/v1/weighted_prices.json', function(err, resp, body) {
      if (err || resp.statusCode !== 200) {
        console.log('Failed to retrieve BTC exchange rates.');
        return;
      }
      try {
        var data = JSON.parse(body);
        BTC_EXCHANGE_RATE = data.USD['24h'];
        console.log('Updated BTC exchange rate: ' + BTC_EXCHANGE_RATE + '.');
      } catch (err) {
        console.log('Failed to parse BTC exchange rates.');
        return;
      }
    });
  },
  startLoop: function() {
    this.__getExchangeRates();
    setInterval(this.__getExchangeRates, 60000);
  }
}

module.exports = Bitcoincharts
