const express = require('express');
const router = express.Router();
const DeliveryInfo = require('../../../models/deliveryInfoModel'); // Import your Order model or schema

// DELETE route to delete an order by ID
router.delete('/DeleteDeliveryinfofromorder/:id', async (req, res) => {
    const orderId = req.params.orderid;

    try {
        // Check if the order exists
        const order = await DeliveryInfo.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // If the order exists, delete it
        await DeliveryInfo.findByIdAndDelete(orderId);

        // Send a success response
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
