import { StatusCodes } from "http-status-codes"
import Department from "../models/Department.js"
import Employee from '../models/Employee.js'


const getAllDepartments = async (req,res) => {
    const departments = await Department.find({}).sort('-updatedAt')
    res.status(StatusCodes.OK).json({departments, count: departments.length})
}


const getAllEmployees = async (req,res) => {
    const employees = await Employee.find({}).sort('-updatedAt')
    res.status(StatusCodes.OK).json({employees : {
        username : employees.username
    }, count : employees.length})
}



export { getAllDepartments , getAllEmployees}