const express = require('express');
const router = express.Router();
const Item = require('../../models/RentalManagementModels/Item');

// API endpoint - get all items 
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router; 
