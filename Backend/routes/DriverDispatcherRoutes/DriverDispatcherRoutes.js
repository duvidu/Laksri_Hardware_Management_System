const { getAllDrivers , createDriver, deleteDriver, updateDriver, getOneDriver, getReportData} = require ('../../controllers/Driver-Dispatcher-Management/driverController')

const express = require('express')

router = express.Router()

router.route('/').post(createDriver).get(getAllDrivers)
router.route('/:id').get(getOneDriver)
router.route('/:id').patch(updateDriver)
router.route('/:id').delete(deleteDriver)
router.route('/reportData').get(getReportData)


module.exports = router