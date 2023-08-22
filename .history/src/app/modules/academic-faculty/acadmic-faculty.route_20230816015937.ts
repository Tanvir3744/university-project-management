import express from "express";
import { AcademicFacultyController } from "./academic-faculty.controller";
const router = express.Router();

router.post("/create-academic-faculty", AcademicFacultyController.createFaculty)