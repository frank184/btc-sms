var async = require('async')

RegistrationsController = {
  create: function(account, req, res, next) {
    async.parallel([
      // Set the user's default settings.
      function(cb) {
        account.customData.balance = 0;
        account.customData.totalQueries = 0;
        account.customData.save(function(err) {
          if (err) return cb(err);
          cb();
        });
      },
      // Create an API key for this user.
      function(cb) {
        account.createApiKey(function(err, key) {
          if (err) return cb(err);
          cb();
        });
      }
    ], function(err) {
      if (err) return next(err);
      next();
    });
  }
}

module.exports = RegistrationsController
