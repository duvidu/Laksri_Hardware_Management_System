const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

//GET all details
const getDetails = async (req, res) =>{
    const employees = await Employee.find({}).sort({createdAt: -1})

    res.status(200).json(employees)
}

//Get a single details
const getDetail = async(req, res) => {
    const{ id } = req.params
    console.log(id)
    // if(!mongoose.Types.ObjectId.isValid(id)) {

    //     return res.status(404).json({error: 'no such details'})
    // }

    const employee = await Employee.findOne({employeeid: id})

    if(!employee){
        return res.status(404).json({error: 'no such details'})
    }

    res.status(200).json(employee)
}





//create a single details
const createDetails = async(req , res) => {
    const {employeeid, fullname,address,email,jobPost,dateofhire,employmenttype,basicsalary} =req.body

    try{
        const employee = await Employee.create({employeeid, fullname,address,email,jobPost,dateofhire,employmenttype,basicsalary})
        res.status(200).json(employee)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a single details

const deleteDetail = async (req, res) =>{
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({error: 'no such detail'})
    }

    const employee = await Employee.findOneAndDelete({_id: id})

    if(!employee){
        return res.status(400).json({error: 'no such detail'})
    }
    res.status(200).json(employee)
}


//update a single details

const updateDetail = async (req, res) =>{
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({error: 'no such detail'})
    }

    const employee = await Employee.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!employee){
        return res.status(400).json({error: 'no such detail'})
    }

    res.status(200).json(employee)
}


module.exports = {
    getDetails,
    getDetail,
    createDetails,
    deleteDetail,
    updateDetail
}