import express from 'express'
import {getAllDepartments, getAllEmployees} from '../controllers/no-auth.js'

const router = express.Router()

router.get('/departments', getAllDepartments)

router.get('/employees', getAllEmployees)



export default router