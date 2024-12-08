const Leave = require('../models/leaveModel')
const AccLeave = require('../models/accleaveModel');
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');


//GET all details
const getLeaves = async (req, res) =>{
    const leaves = await Leave.find({}).sort({createdAt: -1})

    res.status(200).json(leaves)
}

//Get a single details
const getLeave = async(req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({error: 'no such leave'})
    }

    const leave = await Leave.findById(id)

    if(!leave){
        return res.status(404).json({error: 'no such leave'})
    }

    res.status(200).json(leave)
}


//create a single details
const createLeave = async(req , res) => {
    const {employeeid,email, leaveType,startDate,endDate,reason} =req.body

    try{
        const leave = await Leave.create({employeeid,email, leaveType,startDate,endDate,reason})
        res.status(200).json(leave)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a single details

const deleteLeave = async (req, res) =>{
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({error: 'no such leave'})
    }

    const leave = await Leave.findOneAndDelete({_id: id})

    if(!leave){
        return res.status(400).json({error: 'no such leave'})
    }
    res.status(200).json(leave)
}


//update a single details

const updateLeave = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such leave' });
    }

    try {
        const leave = await Leave.findOneAndUpdate({ _id: id }, { ...req.body });
        
        // Send acceptance email
        await sendAcceptanceEmail(leave.email,leave);
        

        if (!leave) {
            return res.status(400).json({ error: 'no such leave' });
        }
        
        res.status(200).json(leave);
        
    } catch (error) {
        console.error('Error updating leave:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//reject leave
const rejectLeave = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such leave' });
    }

    try {

        const leave = await Leave.findOneAndUpdate({ _id: id }, { ...req.body });

        // Send rejection email with the specified email address
        await sendRejectionEmail(leave.email,leave);

        await Leave.findOneAndDelete({ _id: id });

        if (!leave) {
            return res.status(400).json({ error: 'Email address is required' });
        }
        res.status(200).json(leave);
        
    } catch (error) {
        console.error('Error rejecting leave request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const sendAcceptanceEmail = async (email, leaveDetails) => {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'duviduk@gmail.com',
        pass: 'dbjp rfke judp kxxf' 
    }
    });

    const emailBody = `
        Dear Employee
        Your leave request has been accepted. Below are the details of the accepted leave:
       
            Employee ID: ${leaveDetails.employeeid}
            Leave Type: ${leaveDetails.leaveType}
            Start Date: ${leaveDetails.startDate}
            End Date: ${leaveDetails.endDate}
            Reason: ${leaveDetails.reason}
        
        
    `;


    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'duviduk@gmail.com', // sender address
        to: email, 
        subject: 'Leave Request Accepted', 
        text: emailBody, 
    });

    console.log('Message sent: %s', info.messageId);
};



const sendRejectionEmail = async (email, leaveDetails) => {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'duviduk@gmail.com',
            pass: 'dbjp rfke judp kxxf' // Replace 'your-password' with your actual Gmail password
        }
    });


    const emailBody = `
        Dear Employee
        Your leave request has been rejected. Below are the details of the rejected leave:
       
            Employee ID: ${leaveDetails.employeeid}
            Leave Type: ${leaveDetails.leaveType}
            Start Date: ${leaveDetails.startDate}
            End Date: ${leaveDetails.endDate}
            Reason: ${leaveDetails.reason}
        
        We apologize for any inconvenience caused.
    `;

    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'duviduk@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Leave Request Rejected', // Subject line
        text: emailBody, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
};



// Endpoint to accept a leave request
const acceptLeave = async (req, res) => {
    const { id } = req.params;
  
    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid leave ID' });
    }
  
    // Find the leave by ID
    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ error: 'No such leave request' });
    }
  
    // Create a new accepted leave and remove the original leave
    const accleave = await AccLeave.create({
      employeeid: leave.employeeid,
      email: leave.email,
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
    });
  
    await Leave.findByIdAndDelete(id); // Delete the original leave
  
    res.status(200).json({ message: 'Leave accepted', accleave });
  };



module.exports = {
    getLeaves,
    getLeave,
    createLeave,
    deleteLeave,
    updateLeave,
    rejectLeave,
    acceptLeave
}