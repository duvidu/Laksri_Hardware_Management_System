const express = require('express');
const router = express.Router();
const VehicleModel = require('../../../models/DeliveryManagementModels/vehicleModel');

router.put('/VehicleUpdateDelete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Find the vehicle by ID and update its details
        const updatedVehicle = await VehicleModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                model: req.body.model,
                millage: req.body.millage,
                availability: req.body.availability
            },
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
