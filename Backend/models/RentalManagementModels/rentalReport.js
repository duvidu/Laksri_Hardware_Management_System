const mongoose = require('mongoose');

const rentalReportSchema = new mongoose.Schema({
  itemId: String,
  itemName: String,
  lenderName: String,
  daysForLend: Number,
  oneDayPrice: Number,
  totalPay: Number,
});

const RentalReport = mongoose.model('Rental-Report', rentalReportSchema);

module.exports = RentalReport;
