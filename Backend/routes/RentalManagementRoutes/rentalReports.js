const express = require('express');
const router = express.Router();
const RentalReport = require('../../models/RentalManagementModels/rentalReport');

// API endpoint - create a new rental report item
router.post('/', async (req, res) => {
  try {
    const { itemId, itemName, lenderName, daysForLend, oneDayPrice, totalPay } = req.body;

    const newRentalReportItem = new RentalReport({
      itemId,
      itemName,
      lenderName,
      daysForLend,
      oneDayPrice,
      totalPay,
    });

    const savedRentalReportItem = await newRentalReportItem.save();
    res.status(201).json(savedRentalReportItem);
  } catch (error) {
    console.error("Error creating rental report item:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// API endpoint - get all rental report items
router.get('/', async (req, res) => {
    try {
      const rentalReportItems = await RentalReport.find();
      res.json(rentalReportItems);
    } catch (error) {
      console.error("Error fetching rental report items:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;

