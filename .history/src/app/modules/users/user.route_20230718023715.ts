import express from 'express';
import  { UserController } from "./user.controller"
i

const router = express.Router();

router.post("/create-user",createUserZodSchema() ,UserController.createUser)

export const UserRoutes = router;