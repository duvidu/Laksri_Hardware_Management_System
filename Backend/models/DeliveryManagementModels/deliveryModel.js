
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    
    shippingAddress: String,
    selectedVehicle: String,
    deliveryCost: String,
    estimateTime: Number
})

const userModel1 = mongoose.model('Delivery' , userSchema)

module.exports = userModel1;