const mongoose = require('mongoose');

const lendedItemSchema = new mongoose.Schema({
  itemId: String,
  itemName: String,
  lenderName: String,
  nicNo : String,
  daysForLend: Number,
  oneDayPrice: Number,
  totalPay: Number,
});

const LendedItem = mongoose.model('Rental-Rented_items', lendedItemSchema);

module.exports = LendedItem;
