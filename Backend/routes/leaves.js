const express = require('express')
const {getLeaves,
    getLeave,
    createLeave,
    deleteLeave,
    updateLeave,
    rejectLeave,
    acceptLeave
    
 }= require('../controllers/leaveController')


const router = express.Router()

//GET all leaves
router.get('/',getLeaves)

//Get a single leave
router.get('/:id',getLeave)

//create a single leave
router.post('/', createLeave)

//delete a single leave
router.delete('/:id',deleteLeave)

//update a single leave
router.patch('/:id',updateLeave)

//reject a singe leave
router.post('/:id/reject', rejectLeave);

// Endpoint to accept a leave request
router.patch('/:id/accept', acceptLeave);



module.exports = router