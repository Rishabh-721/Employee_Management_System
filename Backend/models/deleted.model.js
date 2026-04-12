const mongoose = require("mongoose");


const deletedSchema = new mongoose.Schema({
    empid: {
        type: String,
        unique: true,
        required: true
    },
})

module.exports = mongoose.model("delete", deletedSchema);
