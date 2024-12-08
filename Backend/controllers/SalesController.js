const SalesModel = require("../models/SalesModel");
// const mongoose = require('mongoose');

const createSale = async (req, res) => {
    try {
        // Get the latest sale from the database
        const latestSale = await SalesModel.findOne({}, {}, { sort: { 'saleId': -1 } });

        let newSaleId;
        if (latestSale) {
            // Extract the numeric part of the latest saleId, increment it, and pad it with zeros
            const latestSaleIdNumber = parseInt(latestSale.saleId.substring(1));
            newSaleId = 'S' + (latestSaleIdNumber + 1).toString().padStart(3, '0');
        } else {
            // If no sales exist yet, start from S001
            newSaleId = 'S001';
        }

        // Extract other fields from request body
        const { date, time, item, unitPrice, quantity } = req.body;

        // Calculate totalPrice
        const totalPrice = unitPrice * quantity;

        // Create a new sale
        const newSale = await SalesModel.create({
            saleId: newSaleId,
            date,
            time,
            item,
            unitPrice,
            quantity,
            totalPrice
        });

        // Send response with the new sale
        return res.status(201).json(newSale);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllSales = async (req, res) => {
    try {
        const sales = await SalesModel.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getOneSale = async (req, res) => {
    try {
        const id = req.params.id;
        const sale = await SalesModel.findById(id);
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteSale = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedSale = await SalesModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Sale Deleted Successfully', item: deletedSale });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSale = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        // Calculate totalPrice if quantity or unitPrice is modified
        if (data.quantity || data.unitPrice) {
            // Extract quantity and unitPrice from data or use the existing values from the database
            const { quantity = 0, unitPrice = 0 } = data;

            // Calculate totalPrice
            data.totalPrice = quantity * unitPrice;
        }

        const updatedSale = await SalesModel.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({ message: 'Sale Updated Successfully', item: updatedSale });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createSale,getAllSales,getOneSale,deleteSale,updateSale}