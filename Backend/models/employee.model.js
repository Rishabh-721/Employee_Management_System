const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    position: {
        type: String,
        required: true
    },
    empid: {
        type: String,
        unique: true,
        required: true
    },
    client: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Emp", employeeSchema);