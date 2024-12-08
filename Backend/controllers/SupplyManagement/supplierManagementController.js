const Supplier = require('../../models/SupplyManagementModels/supplierModel');
const mongoose = require('mongoose')

// get all Suppliers
const getAllSuppliers = async (req, res) => {

    try {
        const Suppliers = await Supplier.find({}).populate('productsSupplied').sort({ createdAt: -1 }).exec();
        //console.log(Suppliers)
        res.status(200).json(Suppliers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// get one supplier

const getOneSupplier = async (req, res) => {

    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid supplier id' });
        }
        const supplier = await Supplier.findById(id).populate('productsSupplied').exec();

        if (!supplier) {
            return res.status(404).json({ error: 'Cannot find the supplier' });
        }
        res.status(200).json(supplier);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create a new supplier

const createSupplier = async (req, res) => {
    const { name, contact, productsSupplied, paymentTerms } = req.body;
    //console.log(req.body)

    try {

        const newSupplier = await Supplier.create({ name, contact, productsSupplied, paymentTerms });

        const populatedSupplier = await Supplier.findById(newSupplier._id).populate('productsSupplied').exec();

        res.status(201).json(populatedSupplier);
               
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// update the supplier

const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, contact, productsSupplied, paymentTerms } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid suppplier id' });
    }

    try {

        const updatedSupplier = await Supplier.findByIdAndUpdate(id, {
            name,
            contact,
            productsSupplied,
            paymentTerms,
        }, { new: true });

        if (!updatedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        const populatedSupplier = await Supplier.findById(id).populate('productsSupplied').exec()


        res.status(200).json(populatedSupplier);
    } catch (error) {

        res.status(400).json({ error: error.message });
    }
}


// delete a supplier

const deleteSupplier = async (req, res) => {

    const { id } = req.params;

    try {

        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        if (!deletedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
}




module.exports = { getAllSuppliers, getOneSupplier, createSupplier, updateSupplier, deleteSupplier }