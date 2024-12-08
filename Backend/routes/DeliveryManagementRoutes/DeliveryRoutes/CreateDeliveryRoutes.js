const express = require('express');
const router = express.Router();
const DeliveryModel = require('../../../models/DeliveryManagementModels/deliveryModel'); // Import your Delivery model here

// Route to create a new delivery
router.post("/CreateDelivery", (req, res) => {
    console.log("Request Body:", req.body); // Log the request body
    DeliveryModel.create(req.body)
        .then(delivery => res.json(delivery))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;
