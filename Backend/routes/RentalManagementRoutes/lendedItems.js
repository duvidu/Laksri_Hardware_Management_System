const express = require('express');
const router = express.Router();
const LendedItem = require('../../models/RentalManagementModels/LendedItem');
const Item = require('../../models/RentalManagementModels/Item');

// API endpoint - create a new lended item
router.post('/', async (req, res) => {
  try {
    const { itemId, itemName, lenderName,nicNo, daysForLend, oneDayPrice, totalPay } = req.body;

    const item = await Item.findById(itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Decrease quantity by 1
    item.quantity -= 1;

    await item.save();

    const lendedItem = new LendedItem({
      itemId,
      itemName,
      lenderName,
      nicNo,
      daysForLend,
      oneDayPrice,
      totalPay,
    });

    const savedLendedItem = await lendedItem.save();
    res.json(savedLendedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint - get all lended items
router.get('/', async (req, res) => {
  try {

    const lendedItems = await LendedItem.find();
    res.json(lendedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// update totalPay and daysForLend
router.put("/:id/updateTotalPayAndDaysForLend", async (req, res) => {
  const { id } = req.params;
  const { totalPay, daysForLend } = req.body;

  try {
    const updatedItem = await LendedItem.findByIdAndUpdate(
      id,
      { totalPay, daysForLend },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating totalPay and daysForLend:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// API endpoint - delete a lended item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await LendedItem.findByIdAndDelete(id);

    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
