const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel')

router.post('/', async (req, res) => {
    try {
      const { productId, userId, rating } = req.body;
      const newRating = new Rating({ productId, userId, rating });
      await newRating.save();
      res.status(201).json({ message: 'Rating added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add rating' });
    }
  });
  
  router.get('/:productId', async (req, res) => {
    try {
        const ratings = await Rating.find({ productId: req.params.productId });
        res.status(200).json({ ratings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch ratings' });
    }
});

  module.exports = router;
