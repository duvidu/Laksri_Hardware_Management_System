const express = require('express');
const router = express.Router();
const DeliveryModel = require('../../../models/DeliveryManagementModels/deliveryModel'); // Import your Delivery model here

// Route to view all deliveries
router.get('/DeliveryView', async (req, res) => {
    try {
        const deliveries = await DeliveryModel.find({});
        res.json(deliveries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
