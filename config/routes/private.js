var bodyParser = require('body-parser');
var express = require('express');
var stormpath = require('express-stormpath');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Controllers
var dashboardController = require('../../app/controllers/dashboard_controller')
var chargesController = require('../../app/controllers/charges_controller')

// Globals
var router = express.Router();

// Middlewares
router.use(bodyParser.urlencoded({ extended: true }));

// Routes
router.get('/', dashboardController.index);

router.post('/charge', chargesController.create);

// Exports
module.exports = router;
