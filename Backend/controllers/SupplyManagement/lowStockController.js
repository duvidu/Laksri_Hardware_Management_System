const LowStock = require('../../models/SupplyManagementModels/lowStockModel')
const Supplier = require('../../models/SupplyManagementModels/supplierModel')
const mongoose = require('mongoose')

// get all Notifications
const getAllLowStockItems = async (req, res) => {
    try {
       
        const lowStockItems = await LowStock.find({});

        
        const updatedLowStockItems = [];

       
        for (const lowStockItem of lowStockItems) {
           
            const productId = lowStockItem.product._id;

           
            const suppliers = await Supplier.find({ productsSupplied: productId });

            
            const updatedLowStockItem = {
                ...lowStockItem.toObject(), 
                suppliers: suppliers
            };

            
            updatedLowStockItems.push(updatedLowStockItem);
        }

        res.status(200).json(updatedLowStockItems);
    } catch (error) {
        console.error('Error fetching low stock items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// get one low stock item

const getOneLowStockItem = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the item'})
    }
    const LowStockItem = await LowStock.findById(id)

    if(!LowStockItem){
        return res.status(404).json({error: 'Cannot find the item'})
    }
    res.status(200).json(LowStockItem) 
}

// post a new low stock item

const createLowStockItem = async (req, res) => {
    const items = req.body; 

    try {
        const createdItems = [];

        for (const item of items) {
            const { product, name, category, quantity } = item;
            
            // Check if a record already exists for the product
            let existingItem = await LowStock.findOne({ product });

            if (existingItem) {
                // If exists, update the existing record
                existingItem.name = name;
                existingItem.category = category;
                existingItem.quantity = quantity;
                
                // Save the updated item
                await existingItem.save();
                createdItems.push(existingItem);
            } else {
                // If doesn't exist, create a new record
                const lowStockItem = await LowStock.create({ product, name, category, quantity });
                createdItems.push(lowStockItem); 
            }
        }

        res.status(200).json(createdItems); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




module.exports = { getAllLowStockItems, getOneLowStockItem, createLowStockItem }