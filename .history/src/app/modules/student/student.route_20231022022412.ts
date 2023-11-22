import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { StudentController } from "./student.controller";
import { StudentValidationZodSchema } from "./student.validation";
const router = express.Router();

router.get("/:id", StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.patch('/:id', validateRequest(StudentValidationZodSchema.updateStudentZodSchema),StudentController.updateStudent)

export const StudentRoute = router;