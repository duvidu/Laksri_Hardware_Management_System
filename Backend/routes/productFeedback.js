const express = require('express')

const { addFeedbackt, getAllFeedback } = require('../controllers/feedbackController')

const router = express.Router()

// GET all products
router.get('/', getAllFeedback)


// POST a new feedback
router.post('/', addFeedbackt)


module.exports = router