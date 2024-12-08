const express = require('express')
const { getAllLowStockItems, getOneLowStockItem, createLowStockItem } = require('../../controllers/SupplyManagement/lowStockController')

const router = express.Router()

//get all notifications
router.get('/notifications', getAllLowStockItems)

//get one notification
router.get('/notifications/:id', getOneLowStockItem)

//post a new notification
router.post('/notifications', createLowStockItem)

module.exports = router