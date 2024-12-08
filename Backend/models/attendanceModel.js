const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    employeeid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent'], 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    timeIn: {
        type: Date
    },
    timeOut: {
        type: Date
    }
},{ timestamps: true })

module.exports = mongoose.model('Attendance', attendanceSchema);