import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthLoginController } from './auth.controller'
import authValidation from '../../middlewares/auth.middleware'
import { ENUM_USER_ROLE } from '../../../enums/users'
const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.authValidationZodSchema),
  AuthLoginController.loginController
)
router.post(
  '/refreshToken',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthLoginController.refreshToken
)
router.post(
  '/change-password',
  authValidation(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.FACULTY
  ),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthLoginController.changePassword
)

export const AuthRoutes = router
