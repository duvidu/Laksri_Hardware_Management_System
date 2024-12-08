const express = require('express')

const { createSale, getAllSales, deleteSale, updateSale, getOneSale } = require( '../controllers/SalesController');

const salesRouter = express.Router();

salesRouter.post('/', createSale);
salesRouter.get('/', getAllSales);
salesRouter.get('/:id', getOneSale);
salesRouter.delete('/:id', deleteSale);
salesRouter.put('/:id', updateSale);

module.exports = salesRouter;


