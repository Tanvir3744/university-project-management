import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { StudentController } from "./student.controller";
import { StudentValidationZodSchema } from "./student.validation";
const router = express.Router();

router.get("/:id", StudentController.getSingleStudent);
router.patch('/:id', validateRequest(StudentValidationZodSchema.updateStudentZodSchema),StudentController.updateStudent)
router.get('/', StudentController.getAllStudents);

export const StudentRoute = router;