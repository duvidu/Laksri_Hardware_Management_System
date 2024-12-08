const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SupplierSchema = new Schema({
  name: {
    type: String,
    //required: true
  },
  contact: {
    phone: String,
    email: String,
    address: String
  },
  productsSupplied: {
    type:[mongoose.Schema.Types.ObjectId],
    ref:'newInventory'
  },
  paymentTerms: String,
  orderHistory: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    
  }],
  performanceMetrics: {
    onTimeDelivery: Number,
    productQuality: Number,
    responsiveness: Number,
    
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Supplier', SupplierSchema);


