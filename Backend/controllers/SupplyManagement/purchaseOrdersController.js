const PurchaseOrder = require('../../models/SupplyManagementModels/purchaseOrderModel');
const Sequence = require('../../models/SupplyManagementModels/sequenceModel')
const Supplier = require('../../models/SupplyManagementModels/supplierModel')
const mongoose = require('mongoose');

// Get all purchase orders
const getAllPurchaseOrders = async (req, res) => {

    try {

        const purchaseOrders = await PurchaseOrder.find({}).sort({ createdAt: -1 }).populate('supplier').populate('items.item');

        res.status(200).json(purchaseOrders);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

// Get one purchase order
const getOnePurchaseOrder = async (req, res) => {

    const { id } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(404).json({ error: 'Invalid purchase order ID' });

        }

        const purchaseOrder = await PurchaseOrder.findById(id);

        if (!purchaseOrder) {

            return res.status(404).json({ error: 'Purchase order not found' });

        }
        res.status(200).json(purchaseOrder);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

// Create a new purchase order
const createPurchaseOrder = async (req, res) => {

    const {  supplier, items, totalAmount, status, receivedDate } = req.body;

    try {

        const sequence = await Sequence.findOneAndUpdate(
            { name: 'purchaseOrder' },
            { $inc: { value: 1 } },
            { new: true, upsert: true }
        );

        // Generate the order number
        const orderNumber = `PO${sequence.value}`;

        const newPurchaseOrder = await PurchaseOrder.create({ orderNumber, supplier, items, totalAmount, status, receivedDate });

        // Update supplier's order history
        await Supplier.findByIdAndUpdate(supplier, {
            $push: { orderHistory: { orderId: newPurchaseOrder._id } }
        });


        const populatePurchaseOrder = await PurchaseOrder.findById(newPurchaseOrder._id).populate('supplier').populate('items.item');

        res.status(201).json(populatePurchaseOrder);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update the purchase order
const updatePurchaseOrder = async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid purchase order ID' });
        }
        
        const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(id, {

            status,

        }, { new: true });

        if (!updatedPurchaseOrder) {

            return res.status(404).json({ error: 'Purchase order not found' });
        }

        const populatePurchaseOrder = await PurchaseOrder.findById(updatedPurchaseOrder._id).populate('supplier').populate('items.item');

        res.status(200).json(populatePurchaseOrder);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }
};

// Delete a purchase order
const deletePurchaseOrder = async (req, res) => {
    
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(404).json({ error: 'Invalid purchase order ID' });
        }

        const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(id);

        if (!deletedPurchaseOrder) {

            return res.status(404).json({ error: 'Purchase order not found' });
        }
        res.status(200).json({ message: 'Purchase order deleted successfully' });

    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAllPurchaseOrders, getOnePurchaseOrder, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder };
