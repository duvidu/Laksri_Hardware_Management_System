const express = require("express");
const router = express.Router();
const ReservedItem = require("../../models/RentalManagementModels/ReservedItem");

// API endpoint - create a new reservation
router.post("/", async (req, res) => {
  try {
    const {
      itemName,
      itemId,
      buyerName,
      contactNo,
      nicNo,
      oneDayPrice,
      daysToRent,
      totalPay,
    } = req.body;

    const newReservation = new ReservedItem({
      itemName,
      itemId,
      buyerName,
      contactNo,
      nicNo,
      oneDayPrice,
      daysToRent,
      totalPay
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// API endpoint - fetch all reserved items
router.get('/', async (req, res) => {
  try {
    const reservedItems = await ReservedItem.find();
    res.json(reservedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// API endpoint - remove a reserved item
router.delete("/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const deletedItem = await ReservedItem.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting reserved item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;