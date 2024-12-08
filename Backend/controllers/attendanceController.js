const Attendance = require('../models/attendanceModel')
const mongoose = require('mongoose')

//GET all details
const getAttendances = async (req, res) =>{
    const attendances = await Attendance.find({}).sort({createdAt: -1})

    res.status(200).json(attendances)
}

//Get a single details
const getAttendance = async(req, res) => {
    const{ id } = req.params
    console.log('id: ',id)
    // if(!mongoose.Types.ObjectId.isValid(id)) {

    //     return res.status(404).json({error: 'no such attendance'})
    // }

    const attendance = await Attendance.findOne({employeeid: id})

    if(!attendance){
        return res.status(404).json({error: 'no such attendance'})
    }

    res.status(200).json(attendance)
}




//create a single details
const createAttendance = async(req , res) => {
    const {employeeid,status,timeIn,timeOut} =req.body

    try{
        const attendance = await Attendance.create({employeeid,status,timeIn,timeOut})
        res.status(200).json(attendance)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}




module.exports = {
    getAttendances,
    getAttendance,
    createAttendance

}