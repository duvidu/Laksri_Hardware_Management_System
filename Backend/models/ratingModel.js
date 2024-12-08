const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'newInventory',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      default:0,
      required: true
    }
  }, { timestamps: true });
  
  const Rating = mongoose.model('Rating', ratingSchema);
  
  module.exports = Rating;