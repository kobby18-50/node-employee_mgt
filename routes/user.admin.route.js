import express from 'express'

import { getAdmin, createAdmin, updateAdmin, deleteAdmin, getAllAdmins, adminLogin} from '../controllers/user.admin.js'

const router = express.Router()

router.route('/').post(createAdmin).get(getAllAdmins)

router.post('/login', adminLogin)

router.route('/:slug').get(getAdmin).patch(updateAdmin).delete(deleteAdmin)

export default router