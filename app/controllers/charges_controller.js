ChargesController = {
  create: function(req, res, next) {
    stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      source: req.body.stripeToken,
      description: 'One time deposit for ' + req.user.email + '.'
    }, function(err, charge) {
      if (err) return next(err);
      req.user.customData.balance += charge.amount;
      req.user.customData.save(function(err) {
        if (err) return next(err);
        res.redirect('/dashboard');
      });
    });
  }
}

module.exports = ChargesController
