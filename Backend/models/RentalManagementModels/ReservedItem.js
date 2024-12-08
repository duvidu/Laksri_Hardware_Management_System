// ReservedItem.js

const mongoose = require('mongoose');

const reservedItemSchema = new mongoose.Schema({
  itemName: String,
  itemId: String,
  buyerName: String,
  contactNo: String,
  nicNo: String,
  oneDayPrice: Number,
  daysToRent: Number,
  totalPay: Number,
  agreed: Boolean
});

const ReservedItem = mongoose.model('Rental-Reserved_Items', reservedItemSchema);

module.exports = ReservedItem;
