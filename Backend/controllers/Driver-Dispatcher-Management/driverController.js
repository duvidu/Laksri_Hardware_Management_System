const Driver = require('../../models/DriverModel/driverModel')
const mongoose = require('mongoose')



const createDriver = async (req, res) => {
  try {
    const { licenseNumber } = req.body;
    const existingEntry = await Driver.findOne({ licenseNumber });
    if (existingEntry) {
      return res.status(400).json({ message: 'License number already exists.' });
    }

    const newDriver = new Driver(req.body);
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: 'License number already exists.' });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const Drivers = await Driver.find({})//.sort({ rating: -1 });
    res.status(200).json(Drivers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error:err });
  }
};

const deleteDriver = async (req, res) => {
  try {
    const result = await Driver.findOneAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: 'The driver with the given ID was not found.' });
    }
    res.json(result);
  } catch (err) {
    console.error("Error during deletion:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateDriver = async (req, res) => {
  try {
    const { licenseNumber } = req.body;
    const driver = await Driver.findById(req.params.id);
    if (driver.licenseNumber !== licenseNumber) {
      const existingEntry = await Driver.findOne({ licenseNumber });
      if (existingEntry) {
        return res.status(400).json({ message: 'License number already exists.' });
      }
    }

    const result = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'The driver with the given ID was not found.' });
    }
    res.json(result);
  } catch (err) {
    console.error("Error during update:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getOneDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getReportData =  async (req, res) => {
  try {
    const totalDrivers = await FormData.countDocuments();
    const availableDrivers = await FormData.countDocuments({ availabilityStatus: 'available' });
    const carDrivers = await FormData.countDocuments({ vehicleType: 'truk' });
    const bikeDrivers = await FormData.countDocuments({ vehicleType: 'bike' });
    const lorryDrivers = await FormData.countDocuments({ vehicleType: 'lorry' });

    res.status(200).json({
      totalDrivers,
      availableDrivers,
      carDrivers,
      bikeDrivers,
      lorryDrivers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
  module.exports = { getAllDrivers , createDriver, deleteDriver, updateDriver, getOneDriver, getReportData}