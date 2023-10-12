
import express from 'express'
import {getAllUsers, getUser, createUser, deleteUser, updateUser} from '../controllers/users.js'

const router = express.Router()

router.route('/:slug').get(getUser).patch(updateUser).delete(deleteUser)

router.route('/').get(getAllUsers).post(createUser)



export default router