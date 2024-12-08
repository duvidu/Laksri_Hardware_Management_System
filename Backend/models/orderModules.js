
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    carts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
