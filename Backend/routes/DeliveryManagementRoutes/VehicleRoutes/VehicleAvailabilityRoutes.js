const express = require('express');
const router = express.Router();
const VehicleModel = require('../../../models/DeliveryManagementModels/vehicleModel'); // Import your Vehicle model here
const DeliveryModel = require('../../../models/DeliveryManagementModels/deliveryModel'); // Import your Vehicle model here



// Route to update vehicle availability by ID
router.put('/VehicleUpdateDelete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Find the vehicle by ID and update its availability
        const updatedVehicle = await VehicleModel.findByIdAndUpdate(
            id,
            { availability: req.body.availability },
            { new: true } // To return the updated document
        );

        // Send the updated vehicle as response
        res.json(updatedVehicle);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
