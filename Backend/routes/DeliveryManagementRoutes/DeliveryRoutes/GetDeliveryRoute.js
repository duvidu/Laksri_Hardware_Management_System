const express = require('express');
const router = express.Router();
const DeliveryModel = require('../../../models/DeliveryManagementModels/deliveryModel'); // Import your Delivery model here

// Define a route to handle GET requests for fetching delivery information by ID
router.get('/getDelivery/:id', (req, res) => {
    const id = req.params.id;
    DeliveryModel.findById({_id: id})
        .then(delivery => res.json(delivery))
        .catch(err => res.json(err));
});

module.exports = router;
