const { getAllPurchaseOrders, getOnePurchaseOrder, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = require('../../controllers/SupplyManagement/purchaseOrdersController');

const express = require('express')

router = express.Router()

router.route('/').post(createPurchaseOrder).get(getAllPurchaseOrders)
router.route('/:id').get(getOnePurchaseOrder)
router.route('/:id').patch(updatePurchaseOrder)
router.route('/:id').delete(deletePurchaseOrder)


module.exports = router