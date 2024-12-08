const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedbackSchema = new mongoose.Schema({
    itemId: String,
    feedback: String,
  },{ timestamps: true });
  
module.exports = mongoose.model('productFeedback', feedbackSchema);