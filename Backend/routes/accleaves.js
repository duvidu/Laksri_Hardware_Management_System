const express = require('express')
const {getAccLeaves,
    getAccLeave,
    createAccLeave,
 }= require('../controllers/accleaveController')


const router = express.Router()

//GET all leaves
router.get('/',getAccLeaves)

//Get a single leave
router.get('/:id',getAccLeave)

//create a single leave
router.post('/', createAccLeave)


module.exports = router