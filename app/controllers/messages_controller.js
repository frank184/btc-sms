var twilio = require('twilio')
var twilioClient = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

MessagesController = {
  create: function(req, res) {
    if (!req.body || !req.body.phoneNumber) {
      return res.status(400).json({ error: 'phoneNumber is required.' });
    } else if (!BTC_EXCHANGE_RATE) {
      return res.status(500).json({ error: "We're having trouble getting the exchange rates right now. Try again soon!" });
    } else if (req.user.customData.balance < COST_PER_QUERY) {
      return res.status(402).json({ error: 'Payment required. You need to deposit funds into your account.' });
    }

    var message = '1 Bitcoin is currently worth $' + BTC_EXCHANGE_RATE  + ' USD.';

    twilioClient.sendMessage({
      to: req.body.phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message
    }, function(err, resp) {
      if (err) return res.status(500).json({ error: "We couldn't send the SMS message. Try again soon!" });

      req.user.customData.balance -= COST_PER_QUERY;
      req.user.customData.totalQueries += 1;
      req.user.customData.save();

      res.json({ phoneNumber: req.body.phoneNumber, message: message, cost: COST_PER_QUERY });
    });
  }
}

module.exports = MessagesController
