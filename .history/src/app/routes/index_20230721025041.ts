import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AcademicSemesterRoutes } from "../modules/academic-semester/academic-semester.route";

const router = express.Router();

router.use('/api/v1/users', UserRoutes);
router.use("/api/v1/academic-semesters", AcademicSemesterRoutes)