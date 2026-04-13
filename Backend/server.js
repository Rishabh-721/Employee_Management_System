const express = require("express");
const connectDB = require("./config/db");
const emp = require ("./models/employee.model");
const employeeRoutes = require('./routes/employee.routes');
const cors = require("cors");

const dotenv = require('dotenv');

dotenv.config();


const PORT =  process.env.PORT || 8000;

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

connectDB();

app.get("/" ,(req, res) => {
    res.status(200).json({
        message: "API Working"
    })
})

app.use("/employee", employeeRoutes);

app.listen(PORT, (err) => {
    if(err){
        console.error(err);
    }else{
        console.log("server Started");
    }
})