const express = require('express');
const router = express.Router();
const VehicleModel = require('../../../models/DeliveryManagementModels/vehicleModel');

router.get('/VehicleView', (req, res) => {
    VehicleModel.find({})
        .then(vehicles => res.json(vehicles))
        .catch(err => res.json(err));
});


router.delete('/VehicleDelete/:id', (req, res) => {
        const id = req.params.id;
        VehicleModel.findByIdAndDelete({_id: id})
            .then(deletedDelivery => {
                res.json(deletedDelivery); // Send the deleted delivery as JSON response
            })
            .catch(err => {
                res.status(500).json({ error: err.message }); // Send error response if there's an error
            });
    });

module.exports = router;
