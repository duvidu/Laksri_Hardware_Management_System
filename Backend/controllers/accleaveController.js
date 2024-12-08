const AccLeave = require('../models/accleaveModel')
const mongoose = require('mongoose')



//GET all details
const getAccLeaves = async (req, res) =>{
    const accleaves = await AccLeave.find({}).sort({createdAt: -1})

    res.status(200).json(accleaves)
}

//Get a single details
const getAccLeave = async(req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({error: 'no such leave'})
    }

    const accleave = await AccLeave.findById(id)

    if(!accleave){
        return res.status(404).json({error: 'no such leave'})
    }

    res.status(200).json(accleave)
}


//create a single details
const createAccLeave = async(req , res) => {
    const {employeeid,email, leaveType,startDate,endDate,reason} =req.body

    try{
        const accleave = await AccLeave.create({employeeid,email, leaveType,startDate,endDate,reason})
        res.status(200).json(accleave)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}




module.exports = {
    getAccLeaves,
    getAccLeave,
    createAccLeave,
}