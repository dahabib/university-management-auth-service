import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
)

// router.get('/:id', UserController.getSingleUser)
// router.patch(
//   '/:id',
//   validateRequest(UserValidation.updateUserZodSchema),
//   UserController.updateUser
// )
// router.delete('/:id', UserController.deleteUser)

// router.get('/', UserController.getUsers)

export const AuthRoutes = router
