import express from 'express'
import { userLogin, userRegister } from '../controllers/userController'

const router = express.Router()

router.post('/auth/user-register', userRegister)
router.post('/auth/user-login', userLogin)
export default router