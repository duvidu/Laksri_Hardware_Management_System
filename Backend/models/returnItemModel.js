const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const returnItemSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: 'newInventory',
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    returnType: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('ReturnItem', returnItemSchema);
