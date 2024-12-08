const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    saleId: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number
    }
}, { timestamps: true });

// Pre-save middleware to generate and assign auto-incremented saleId
SalesSchema.pre('save', async function(next) {
    try {
        if (!this.isNew) {
            return next();
        }

        // Find the latest sale
        const latestSale = await this.constructor.findOne({}, {}, { sort: { 'saleId': -1 } });

        let newSaleId;
        if (latestSale) {
            // Extract the numeric part of the latest saleId, increment it, and pad it with zeros
            const latestSaleIdNumber = parseInt(latestSale.saleId.substring(1));
            newSaleId = 'S' + (latestSaleIdNumber + 1).toString().padStart(3, '0');
        } else {
            // If no sales exist yet, start from S001
            newSaleId = 'S001';
        }

        // Assign the generated saleId
        this.saleId = newSaleId;

        // Calculate totalPrice
        this.totalPrice = this.quantity * this.unitPrice;

        next();
    } catch (error) {
        next(error);
    }
});

// Ensure virtuals are included in toJSON output
SalesSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("sales", SalesSchema);

