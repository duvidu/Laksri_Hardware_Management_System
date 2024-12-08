const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: { 
        type: Number,
        required: true
    },
    pricebeforeDiscount: { 
        type: Number,
        required: true
    },
    buyingPrice: { 
        type: Number,
        required: true
    },
    discount: { 
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true 
    },
    quantityLimit: {
        type: Number,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    img_URL: {
        type: String,
        required: true 
    },
    displayItem: {
        type: Boolean,
        required: true 
    },
},{ timestamps: true })

module.exports = mongoose.model('newInventory', inventorySchema);
