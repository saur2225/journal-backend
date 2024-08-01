const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: String,
    email: String,
    address: String,
    apartment: String,
    country: String,
    state: String,
    city: String,
    pincode: String,
    orderAmount: Number,
    numberOfOrders: Number,
    orderId: String,
    orderDate: Date
});

module.exports = mongoose.model('Journal-orders', orderSchema);
