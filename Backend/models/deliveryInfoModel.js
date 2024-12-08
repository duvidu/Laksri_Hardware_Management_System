const mongoose = require('mongoose');

const deliveryInforSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email:{type:String, required:true},
    phoneNumber:{type:Number, required:true},
    address:{type:String, required:true},
    city:{type:String, required:true},
    totalPrice: {type:Number, required:true}
},{ timestamps:true })

module.exports = mongoose.model('DeliveryInfo', deliveryInforSchema);