const Inventory = require('../models/inventoryModel')
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// get all product data
const getAllProducts = async (req, res) => {
    
    const allInventorydata = await Inventory.find({}).sort({createdAt: -1})

    res.status(200).json(allInventorydata)
}

// get a single product data
const getProduct = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the product'})
    }
    const product = await Inventory.findById(id)

    if(!product){
        return res.status(404).json({error: 'Cannot find the product'})
    }
    res.status(200).json(product)
}

// add new product
const addProduct = async (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './upload/images');
        },
        filename: function (req, file, cb) {
            const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
            req.uploadedFileName = filename; // Save the renamed file name to the request object
            cb(null, filename);
        }
    });

    const upload = multer({ storage: storage });

    upload.single('image')(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { name, category, brand, price, pricebeforeDiscount, buyingPrice, discount, quantity, quantityLimit, description, displayItem } = req.body;
        const img_URL = req.uploadedFileName; 

        try {
            const inventorydata = await Inventory.create({ name, category, brand, price, pricebeforeDiscount, buyingPrice, discount, quantity, quantityLimit, description, img_URL, displayItem });
            res.status(200).json(inventorydata);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}


// delete a product
const deleteProduct = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the product'})
    }

    const product = await Inventory.findByIdAndDelete({_id: id})

    if(!product){
        return res.status(404).json({error: 'Cannot find the product'})
    }

    const imagePath = path.join(__dirname, '..', 'upload', 'images', product.img_URL);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image ', err);
                return res.status(500).json({ error: 'Failed to delete image' });
            }
            console.log('Image file deleted');
        });

    res.status(200).json(product)

}

// update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Cannot find the product' });
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './upload/images');
        },
        filename: function (req, file, cb) {
            const img_URL = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
            req.uploadedFileName = img_URL; // Save the renamed file name to the request object
            cb(null, img_URL);
        }
    });

    const upload = multer({ storage: storage }).single('image');

    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            let updateData = { ...req.body };

            // Check if a file is uploaded
            if (req.file) {
                // Update the image URL in the update data
                updateData.img_URL = req.uploadedFileName;

                // Update the image URL in the database
                const product = await Inventory.findById(id);
                if (product) {
                    const imagePath = path.join(__dirname, '..', 'upload', 'images', product.img_URL);
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error('Error deleting image ', err);
                        }
                    });
                }
            } else {
                // If no file is uploaded, remove the img_URL from the update data
                delete updateData.img_URL;
            }

            // Update the product
            const product = await Inventory.findByIdAndUpdate(id, updateData, { new: true });

            if (!product) {
                return res.status(404).json({ error: 'Cannot find the product' });
            }

            return res.status(200).json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
};





module.exports = { getAllProducts, getProduct, addProduct, deleteProduct, updateProduct }