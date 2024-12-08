const express = require('express');
const router = express.Router();
const VehicleModel = require('../../../models/DeliveryManagementModels/vehicleModel');


router.get('/getVehicle/:id', (req, res) => {
    const id = req.params.id;
    VehicleModel.findById({ _id: id })
        .then(vehicle => res.json(vehicle))
        .catch(err => res.json(err));
});

module.exports = router;
