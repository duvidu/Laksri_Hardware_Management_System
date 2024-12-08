const express = require('express')

const { addCategory, getAllCategories, deleteCategory } = require('../controllers/categoryController')

const router = express.Router()

// GET all category
router.get('/', getAllCategories)

// POST a new category
router.post('/', addCategory)

// DELET a category
router.delete('/:id', deleteCategory)


module.exports = router