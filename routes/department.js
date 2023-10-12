import express from 'express'
import {getAllDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment} from '../controllers/departments.js'

const router = express.Router()

router.route('/').get(getAllDepartments).post(createDepartment)

router.route('/:slug').get(getDepartment).patch(updateDepartment).delete(deleteDepartment)

export default router