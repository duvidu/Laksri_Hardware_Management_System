const Feedback = require('../models/itemFeedback');
const mongoose = require('mongoose');

// get all product data
const getAllFeedback = async (req, res) => {
    try {
        const allFeedbackData = await Feedback.find({}).sort({ createdAt: -1 });
        res.status(200).json(allFeedbackData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get a single product data
// const getProduct = async (req, res) => {
//     const { id } = req.params;
//     try {
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(404).json({ error: 'Cannot find the product' });
//         }
//         const product = await Inventory.findById(id);
//         if (!product) {
//             return res.status(404).json({ error: 'Cannot find the product' });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// add new product
const addFeedbackt = async (req, res) => {
    const { itemId, feedback } = req.body;
    try {
        const feedbackData = await Feedback.create({ itemId, feedback });
        res.status(201).json(feedbackData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a product
// const deleteProduct = async (req, res) => {
//     const { id } = req.params;
//     try {
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(404).json({ error: 'Cannot find the product' });
//         }
//         const product = await Inventory.findByIdAndDelete(id);
//         if (!product) {
//             return res.status(404).json({ error: 'Cannot find the product' });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


module.exports = { getAllFeedback, addFeedbackt };
