var express = require('express')
var stormpath = require('express-stormpath')
var bitcoincharts = require('./lib/bitcoincharts')

var registrationsController = require('./app/controllers/registrations_controller')


var app = express()

// Settings
app.set('view engine', 'jade')
app.set('views', './app/views')

app.locals.siteTitle = 'BTC SMS'
app.locals.costPerQuery = parseInt(process.env.COST_PER_QUERY)
app.locals.stripePublishableKey = process.env.TEST_STRIPE_PUBLIC

// Middleware
app.use('/public', express.static('./public', {
  index: false,
  redirect: false
}));
app.use('/public', express.static('./bower_components', {
  index: false,
  redirect: false
}));
app.use(stormpath.init(app, {
  enableAccountVerification: true,
  expandApiKeys: true,
  expandCustomData: true,
  redirectUrl: '/dashboard',
  secretKey: process.env.BTC_SMS_SECRET || 'blah',
  postRegistrationHandler: registrationsController.create
}));

// Routes
app.use('/', require('./config/routes/public'));
app.use('/api', stormpath.apiAuthenticationRequired, require('./config/routes/api'));
app.use('/dashboard', stormpath.loginRequired, require('./config/routes/private'));

bitcoincharts.startLoop()

// Server
app.listen(process.env.PORT || 3000);
