const express = require('express')

const { getAllBrands, addBrand, deleteBrand } = require('../controllers/brandController')

const router = express.Router()

// GET all brands
router.get('/', getAllBrands)

// POST a new brands
router.post('/', addBrand)

// DELET a brands
router.delete('/:id', deleteBrand)


module.exports = router