const express = require('express')

const { getAllReturnProducts, getReturnProduct, addReturnProduct } = require('../controllers/returnItemController')

const router = express.Router()

// GET all return item
router.get('/', getAllReturnProducts)

// GET a single return item
router.get('/:id', getReturnProduct)

// POST a new return item
router.post('/', addReturnProduct)

module.exports = router