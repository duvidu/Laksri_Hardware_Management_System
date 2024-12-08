// routes/deliveryInfoRoutes.js

const express = require('express');
const router = express.Router();
const DeliveryInfo = require('../../../models/deliveryInfoModel');

// Route to get delivery information
router.get('/Deliveryinfofromorder', async (req, res) => {
    try {
        // Fetch delivery information from the database
        const deliveryInfo = await DeliveryInfo.find();
        res.json(deliveryInfo);
    } catch (err) {
        console.error('Error fetching delivery information:', err);
        res.status(500).json({ message: 'Failed to fetch delivery information' });
    }
});


router.delete('/DeleteDeliveryinfofromorder/:id', (req, res) => {
    const id = req.params.id;
    DeliveryInfo.findByIdAndDelete({_id: id})
        .then(deletedDelivery => {
            res.json(deletedDelivery); // Send the deleted delivery as JSON response
        })
        .catch(err => {
            res.status(500).json({ error: err.message }); // Send error response if there's an error
        });
});



module.exports = router;
