import express from "express";
import { academicSemesterValidation } from "./academicValidation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/create-semester", validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),);

export const academicSemesterRoutes = router; 