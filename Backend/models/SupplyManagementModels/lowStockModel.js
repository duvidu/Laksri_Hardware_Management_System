const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const LowStockSchema = new Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newInventory', // Reference to the Product model
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    
},{ timestamps: true })


module.exports = mongoose.model('LowStock', LowStockSchema);
