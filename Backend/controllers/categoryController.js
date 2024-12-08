const Category = require('../models/productCategory');
const mongoose = require('mongoose');

// get all category 
const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}).sort({ createdAt: -1 });
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// add new category
const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid category ID' });
        }
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { addCategory, getAllCategories, deleteCategory };
