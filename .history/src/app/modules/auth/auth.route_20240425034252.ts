import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthLoginController } from './auth.controller';
const router = express.Router();

router.post('/login', validateRequest(AuthValidation.authValidationZodSchema), AuthLoginController.loginController);
router.post("/refreshToken", /* validateRequest(AuthValidation.refreshTokenZodSchema) */AuthLoginController.refreshToken)

export const AuthRoutes = router;