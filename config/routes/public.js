var express = require('express');
var homeController = require('../../app/controllers/home_controller')

// Globals
var router = express.Router();

// Routes
router.get('/', homeController.index);

router.get('/pricing', homeController.pricing);

router.get('/docs', homeController.docs);

// Exports
module.exports = router;
