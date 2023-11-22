import express from "express";
/* import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../users/user.validation"; */
import { StudentController } from "./student.controller";
const router = express.Router();

router.get("/:id", StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoute = router;