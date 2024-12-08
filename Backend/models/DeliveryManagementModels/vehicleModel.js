const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    
    name: String,
    model: String,
    millage: String,
    availability: String
})

const userModel = mongoose.model('vehicle' , userSchema)

module.exports = userModel;