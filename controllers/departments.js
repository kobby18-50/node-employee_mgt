import Department from "../models/Department.js"
import { StatusCodes } from 'http-status-codes'
import NotFoundError from '../errors/not-found.js'
import BadRequestError from '../errors/bad-request.js'

const getAllDepartments = async (req,res) => {
    const departments = await Department.find({createdBy : req.user.userId})

    res.status(StatusCodes.OK).json({departments, count : departments.length})
}

const getDepartment = async (req,res) => {
    const department = await Department.findOne({_id : req.params.slug, createdBy : req.user.userId})

    if(!department){
        throw new NotFoundError(`No department with id ${req.params.slug} found`)
    }
    
    res.status(StatusCodes.ACCEPTED).json({department})
}

const createDepartment = async (req,res) => {
    req.body.createdBy = req.user.userId
   const department = await Department.create(req.body)

   res.status(StatusCodes.ACCEPTED).json({department})
}

const updateDepartment = async (req, res) => {
    const department = await Department.findByIdAndUpdate({_id : req.params.slug, createdBy : req.user.userId}, req.body, {new : true, runValidators : true})

    if(!department){
        throw new NotFoundError(`No department with id ${req.params.slug} found`)
    }
    res.status(StatusCodes.ACCEPTED).json({department})
}

const deleteDepartment = async (req,res) => {
    const department = await Department.findOneAndDelete({_id : req.params.slug, createdBy : req.user.userId})

    if(!department){
        throw new NotFoundError(`No department with id ${req.params.slug} found`)
    }

    res.status(StatusCodes.OK).json({msg : 'Department deleted', department : null})
}

export {getAllDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment}