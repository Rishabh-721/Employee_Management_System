const emp = require("../models/employee.model");
const deleted = require("../models/deleted.model");

const createEmployee = async (req, res) => {
    
    try {
    const {name, email, position, empid, client} = req.body;

    const smallemail = email.toLowerCase().trim();

    const employee = {
        name,
        email : smallemail,
        position,
        empid,
        client
    }

    const existsInDelete = await deleted.findOne({empid});
    const existingEmployee = await emp.findOne({
  $or: [
    { email: req.body.email },
    { empid: req.body.empid }
  ]
    });

    if(existsInDelete){
        return res.status(400).json({
            message: "Wrong Empoyee ID this is used before and can't be reused"
        })    
    }

    if(existingEmployee){
        return res.status(400).json({
            message: "Employee already created kindly check again"
        })
    }

    const data = await emp.create(employee);

    res.status(201).json({
        message: "Employee Created Sucessfully",
        data
    });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
};

const getEmployees = async (req, res) => {
    try {
    const { name, empid, client } = req.query;

    let query = {};

    // name search
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // client search
    if (client) {
      query.client = { $regex: client, $options: "i" };
    }

    // empid search
    if (empid) {
      const clean = empid.trim();

      if (clean.length > 6) {
        return res.status(400).json({
          message: "Employee id can't be more than 6 digits"
        });
      }

      query.empid =
        clean.length === 6
          ? clean
          : { $regex: clean };
    }

    const data = await emp.find(query);

    res.status(200).json({
      message: "Employees fetched successfully",
      data: data
    });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
    
};

const getEmpbyId = async (req,res) => {
    try {
        const id = req.params.id;

        const employee = await emp.findById(id);

    if(!employee){
        return res.status(404).json({
            message : "Employee dose not exist",
        })
    }

    res.status(200).json({
        message: "Employee Found Sucessfully",
        data: employee
    })
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
}

const updateEmpById = async (req,res) => {

    try {
    const id = req.params.id;
    const employee = await emp.findById(id);

    if(!employee){
        return res.status(404).json({
            message : "Employee dose not exist",
        })
    }

    const {name, email, position, empid, client} = req.body;

    if(name)employee.name = name;
    if(email)employee.email = email;
    if(position)employee.position = position;
    if(empid)employee.empid = empid;
    if(client)employee.client = client;

    await employee.save();

    res.status(200).json({
        message: "Employee updated sucessfully",
        data: employee
    })
    
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
}


const deleteEmp = async (req, res) => {
    try {
    
        const id = req.params.id;

        const deletedemp = await emp.findById(id);

        if(!deletedemp){
            res.status(404).json({
                message: "Employee is not in Database"
            })
        }

        await deleted.create({
            empid: deletedemp.empid
        });

        await emp.findByIdAndDelete(id);

        res.status(200).json({
            message: "Employee Permanently Deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    getEmpbyId,
    updateEmpById,
    deleteEmp
}