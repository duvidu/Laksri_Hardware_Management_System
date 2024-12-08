const { getAllSuppliers, getOneSupplier, createSupplier, updateSupplier, deleteSupplier } = require ('../../controllers/SupplyManagement/supplierManagementController')

const express = require('express')

router = express.Router()

router.route('/').post(createSupplier).get(getAllSuppliers)
router.route('/:id').get(getOneSupplier)
router.route('/:id').patch(updateSupplier)
router.route('/:id').delete(deleteSupplier)


module.exports = router