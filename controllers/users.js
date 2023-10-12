import { StatusCodes } from "http-status-codes"
import UnAuthorizedError from "../errors/unauthenticated.js"
import NotFoundError from "../errors/not-found.js"
import Employee from '../models/Employee.js'


const getUser = async (req,res) => {
    const employee = await Employee.findOne({createdBy : req.user.userId, _id : req.params.slug})

    if(!employee){
        throw new NotFoundError(`No user with ${req.params.slug} found`)
    }
    res.status(StatusCodes.ACCEPTED).json({employee : employee.userName})
}

const getAllUsers = async (req,res) => {
    const employees = await Employee.find({createdBy : req.user.userId})
    res.status(StatusCodes.OK).json({employees : employees.userName, count : employees.length})
}

const createUser = async (req,res) => {
    const {userId, role } = req.user

    if(role !== 'admin'){
        throw new UnAuthorizedError('Employees cannot create other employees')
    }

    req.body.createdBy = userId

    const employee = await Employee.create(req.body)

    res.status(StatusCodes.OK).json({employee})
}

const updateUser = async (req,res) => {
    const employee = await Employee.findByIdAndUpdate({createdBy : req.user.userId, _id : req.params.slug}, req.body, {new : true, runValidators : true})

    if(!employee){
        throw new NotFoundError(`No user with id ${req.params.slug} found`)
    }

    res.status(StatusCodes.ACCEPTED).json({employee})
    
}

const deleteUser = async (req,res) => {
    const employee = await Employee.findOneAndDelete({_id : req.params.slug, createdBy : req.user.userId})

    if(!employee){
        throw new NotFoundError(`No employee with id ${req.params.slug} found`)
    }
    res.status(StatusCodes.OK).json({msg : 'Employee deleted'})
}


export { getUser, getAllUsers, createUser, updateUser, deleteUser}