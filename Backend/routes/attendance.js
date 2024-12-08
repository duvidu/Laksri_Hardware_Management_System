const express = require('express')
const {getAttendances,
    getAttendance,
    createAttendance
 }= require('../controllers/attendanceController')


const router = express.Router()

//GET all attendance
router.get('/',getAttendances)

//create a single attendance
router.post('/', createAttendance)

//Get a single attendance
router.get('/:id',getAttendance)




module.exports = router
