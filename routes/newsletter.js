const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

// POST /newsletter
router.post('/', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Email is required' });
    }

    try {
        const newEmail = new Email({ email });
        await newEmail.save();
        console.log(`Received email for newsletter: ${email}`);
        return res.status(200).json({ msg: 'Email received and stored successfully' });
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        return res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
