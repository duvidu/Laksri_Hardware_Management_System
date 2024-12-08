const mongoose = require('mongoose');

const Schema = mongoose.Schema

const categorySchema = new mongoose.Schema({
  name: String,
},{ timestamps: true });

module.exports = mongoose.model('productCategory', categorySchema);
