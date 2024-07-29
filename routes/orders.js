const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();

// Endpoint to save order after successful payment
router.post('/', async (req, res) => {
    try {
        const { addressData, orderAmount, numberOfOrders, orderId, orderDate } = req.body;
        const orderDetails = new Order({
            ...addressData,
            orderAmount,
            numberOfOrders,
            orderId,
            orderDate
        });
        await orderDetails.save();
        res.status(201).json({ message: 'Address and order details saved successfully' });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Error saving order' });
    }
});

module.exports = router;
