const express = require('express')
const {getDetails,
    getDetail,
    createDetails,
    deleteDetail,
    updateDetail
 }= require('../controllers/employeeController')


const router = express.Router()

//GET all details
router.get('/',getDetails)

//Get a single details
router.get('/:id',getDetail)



//create a single details
router.post('/', createDetails)

//delete a single details
router.delete('/:id',deleteDetail)

//update a single details
router.patch('/:id',updateDetail)



module.exports = router
