import User from "../models/User.admin.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import UnAuthenticatedError from '../errors/unauthenticated.js'

const getAllAdmins = async (req, res) => {
    const users = await User.find()

  res.status(StatusCodes.OK).json({users, count : users.length});
};

const getAdmin = async (req, res) => {
    const { slug } = req.params

    const user = await User.findOne({_id : slug})

    if(!user){
        throw new NotFoundError(`No user with id ${slug} found`)
    }

    res.status(StatusCodes.ACCEPTED).json({user})
};

const createAdmin = async (req, res) => {
    // check duplicate full name
    const checkName = await User.findOne({fullName : req.body.fullName})
    
    if(checkName){
        throw new BadRequestError('Duplicate value entered for full name')
    }
    const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: user.getUser(),
    token,
  });
};

const updateAdmin = async (req, res) => {
    const user = await User.findByIdAndUpdate({_id : req.params.slug}, req.body, {new:true, runValidators : true})

    if(!user){
        throw new NotFoundError(`No admin with id ${req.params.slug}`)
    }

    res.status(StatusCodes.OK).json({user})
};

const deleteAdmin = async (req, res) => {
    const user = await User.findOneAndDelete({_id : req.params.slug})

    if(!user){
        throw new NotFoundError(`No admin with id ${req.params.slug}`)
    }

  res.status(StatusCodes.OK).json({msg : 'User deleted'});
};

const adminLogin = async (req,res) => {
  
  const {email, password } = req.body
  
  const user = await User.findOne({email})

  // finding user by email
  if(!user){
    throw new UnAuthenticatedError('No user found')
  }

  // comparing password
  const passwordMatch = await user.comparePassword(password)

  if(!passwordMatch){
    throw new UnAuthenticatedError('Invalid credentials')
  }

  // produce token
  const token = await user.createJWT()


  res.status(StatusCodes.ACCEPTED).json({
    user : user.getUser(),
    token
  })

}

export { createAdmin, getAdmin, getAllAdmins, updateAdmin, deleteAdmin, adminLogin };
