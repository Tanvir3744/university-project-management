import express from "express";
import { AcademicFacultyController } from "./academic-faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academic-faculty.validation";
const router = express.Router();

router.post("/create-academic-faculty", validateRequest(AcademicFacultyValidation.academicFacultyZodSchema), AcademicFacultyController.createFaculty)