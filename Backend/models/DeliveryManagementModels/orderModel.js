const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

    OrderId:String,
    Address:String,
    
})

const OrderModel = mongoose.model('Orders' , UserSchema)

module.exports = VehicleModel;