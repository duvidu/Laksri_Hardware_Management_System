const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true,
        default: 1000 // Initial value for the sequence
    }
});

module.exports = mongoose.model('Sequence', SequenceSchema);
