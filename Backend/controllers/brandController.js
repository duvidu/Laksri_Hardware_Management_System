const Category = require('../models/productBrand');
const mongoose = require('mongoose');

// get all brands 
const getAllBrands = async (req, res) => {
    try {
        const allCategories = await Category.find({}).sort({ createdAt: -1 });
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// add new brand
const addBrand = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ error: 'Brand name is required' });
        }

        // Check if brand already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Brand already exists' });
        }

        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete a brand
const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid Brand ID' });
        }
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { getAllBrands, addBrand, deleteBrand };
