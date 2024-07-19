require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

router.post("/orders", async (req, res) => {
    console.log("Received request for /orders");
    try {
        const { amount, currency } = req.body;

        if (!amount || !currency) {
            return res.status(400).send("Amount and currency are required");
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: currency,
            receipt: "receipt_order_74394",
        };

        console.log("Creating order with options:", options);

        const order = await instance.orders.create(options);

        console.log("Order created:", order);

        if (!order) return res.status(500).send("Some error occurred");

        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send(error);
    }
});

router.post("/success", async (req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        console.log("Digest:", digest);
        console.log("Razorpay Signature:", razorpaySignature);

        if (digest !== razorpaySignature) {
            return res.status(400).json({ msg: "Transaction not legit!" });
        }

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).send(error);
    }
});

module.exports = router;
