var bodyParser = require('body-parser');
var express = require('express');
var twilio = require('twilio')
var twilioClient = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var messagesController = require('../../app/controllers/messages_controller.js')

// Globals
var router = express.Router();

// Middlewares
router.use(bodyParser.json());

// Routes
router.post('/message', messagesController.create);

// Exports
module.exports = router;
