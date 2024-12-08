const mongoose = require('mongoose');
const { type } = require('os');

const Schema = mongoose.Schema;

const ReturnedItemsSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newInventory',
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    items: [{
        serialNumber: {
            type: String,
            required: true
        },
        returnType: {
            type: String,
            required: true
        },
        description: String,
    }],
    amount:{
        type:Number,
        required:true
    },
    isRefunded:{
        type:Boolean,
        required:true
    },
    returnedDate: {
        type: Date,
        default: Date.now
    },
    refundedDate: {
        type: Date,
        default: Date.now
    },
});

const ReturnedItems = mongoose.model('ReturnedItems', ReturnedItemsSchema);

module.exports = ReturnedItems;
