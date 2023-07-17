import express from 'express';
import usersController, { UserController } from "./user.controller"


const router = express.Router();

router.post("/create-user", UserController.createUser)

export default router;