const mongoose = require("mongoose");

const connectDB =  async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/company");
        console.log(`Database Connected ${conn.connection.host}`)
    } catch (error) {
        console.error(`Connection error = ${error}`);
        process.exit(-1);
    }
}

module.exports = connectDB;