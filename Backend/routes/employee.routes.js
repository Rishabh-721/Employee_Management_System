const express = require("express");
const router = express.Router();

const {createEmployee, getEmployees, getEmpbyId, updateEmpById, deleteEmp} = require('../controllers/emp.controller');


router.get("/", getEmployees);
router.get("/:id",  getEmpbyId);

router.post("/",  createEmployee);

router.put("/:id",  updateEmpById);

router.delete("/:id", deleteEmp);

module.exports = router;

