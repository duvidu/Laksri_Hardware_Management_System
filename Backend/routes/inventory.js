const express = require('express')

const { addProduct, getProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/inventoryController')

const router = express.Router()

// GET all products
router.get('/', getAllProducts)

// GET a single product
router.get('/:id', getProduct)

// POST a new product
router.post('/', addProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

// update a product
router.patch('/:id', updateProduct)

module.exports = router