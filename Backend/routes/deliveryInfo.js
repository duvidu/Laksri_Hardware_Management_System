const express = require('express')
const router = express.Router();
const deliveryInfoController = require('../controllers/deliveryInfoController');

router.post('/',deliveryInfoController.addDeliveryInfo);

module.exports = router;