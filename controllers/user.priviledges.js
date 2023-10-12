import { StatusCodes } from "http-status-codes"
import Employee from '../models/Employee.js'
import UnAuthorizedError from "../errors/unauthenticated.js"

const userLogin = async (req,res) => {
    const { email, password} = req.body
    const employee = await Employee.findOne({email})

    if(!employee){
        throw new UnAuthorizedError('No employee found')
    }

    const token = await employee.createJWT()

    const passwordMatch = await employee.comparePassword(password)

    if(!passwordMatch){
        throw new UnAuthorizedError('Invalid credentials')
    }


    res.status(StatusCodes.ACCEPTED).json({employee : employee.getEmployee(), token})

}

export {userLogin}