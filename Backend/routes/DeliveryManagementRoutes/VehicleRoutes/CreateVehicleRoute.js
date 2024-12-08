const express = require('express');
const router = express.Router();
const VehicleModel = require('../../../models/DeliveryManagementModels/vehicleModel');


router.post("/CreateVehicle", (req, res) => {
    VehicleModel.create(req.body)
        .then(vehicle => res.json(vehicle))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;
