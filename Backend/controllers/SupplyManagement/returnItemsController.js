const ReturnedItems = require('../../models/SupplyManagementModels/returnItemsModel');

// Controller function to get all return items
const getAllReturnItems = async (req, res) => {
    try {
        const returnItems = await ReturnedItems.find().populate('product').populate('supplier');
        res.status(200).json(returnItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get one return item by ID
const getOneReturnItem = async (req, res) => {
    try {
        const returnItem = await ReturnedItems.findById(req.params.id);
        if (!returnItem) {
            return res.status(404).json({ error: 'Return item not found' });
        }
        res.status(200).json(returnItem);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to create a return item
const createReturnItem = async (req, res) => {
    console.log(req.body)
    try {
        const returnItem = await ReturnedItems.create(req.body);
        res.status(201).json(returnItem);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
};

// Controller function to update a return item by ID
const updateReturnItem = async (req, res) => {
    console.log(req.body)
    try {
        const returnItem = await ReturnedItems.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!returnItem) {
            return res.status(404).json({ error: 'Return item not found' });
        }
        res.status(200).json(returnItem);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
};

// Controller function to delete a return item by ID
const deleteReturnItem = async (req, res) => {
    try {
        const returnItem = await ReturnedItems.findByIdAndDelete(req.params.id);
        if (!returnItem) {
            return res.status(404).json({ error: 'Return item not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllReturnItems,
    getOneReturnItem,
    createReturnItem,
    updateReturnItem,
    deleteReturnItem
};
