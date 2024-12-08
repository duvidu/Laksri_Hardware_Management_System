const mongoose = require('mongoose');

const Schema = mongoose.Schema

const brandSchema = new mongoose.Schema({
  name: String,
},{ timestamps: true });

module.exports = mongoose.model('productBrand', brandSchema);
