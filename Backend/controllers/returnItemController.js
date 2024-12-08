const returnItem = require('../models/returnItemModel');
const Inventory = require('../models/inventoryModel');
const mongoose = require('mongoose');
const Supplier = require('../models/SupplyManagementModels/supplierModel')

// get all return item data
const getAllReturnProducts = async (req, res) => {
    try {
       
        const returnItems = await returnItem.find({}).populate('name');

        
        const updatedreturnItems = [];

       
        for (const returnItem of returnItems) {
           
            const productId = returnItem.name;

           
            const suppliers = await Supplier.find({ productsSupplied: productId });

            
            const updatedreturnItem = {
                ...returnItem.toObject(), 
                suppliers: suppliers
            };

            
            updatedreturnItems.push(updatedreturnItem);
        }

        res.status(200).json(updatedreturnItems);
    } catch (error) {
        console.error('Error fetching return items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get a single return item data
const getReturnProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Cannot find data' });
        }
        const returnProduct = await returnItem.findById(id);
        if (!returnProduct) {
            return res.status(404).json({ error: 'Cannot find data' });
        }
        res.status(200).json(returnProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// add new return item
const addReturnProduct = async (req, res) => {
    const { name, serialNumber, returnType, description } = req.body;
    try {
        //check if the provided name exists in inventory
        const inventoryItem = await Inventory.findOne({ name });
        if (!inventoryItem) {
            return res.status(404).json({ error: 'Item not found in inventory' });
        }
        const returnItemData = await returnItem.create({ name: inventoryItem._id, serialNumber, returnType, description });
        res.status(201).json(returnItemData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAllReturnProducts, getReturnProduct, addReturnProduct };
