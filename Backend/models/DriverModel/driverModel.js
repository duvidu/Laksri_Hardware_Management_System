const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    licenseNumber: { type: String, unique: true }, // Set licenseNumber to be unique
    vehicleType: String,
    availabilityStatus: String,
    rating: Number
  });
  
  module.exports = mongoose.model('Driver', DriverSchema);