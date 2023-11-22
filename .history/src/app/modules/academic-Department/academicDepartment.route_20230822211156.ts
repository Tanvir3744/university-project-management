import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controllers'
const router = express.Router()

router.post(
    '/create-department',
    validateRequest(
        AcademicDepartmentValidation.createAcademicDepartmentZodSchema
    ),
    AcademicDepartmentControllers.createAcademicDepartment
);

router.get("/:id", AcademicDepartmentControllers.getSingleDepartment);

export const AcademicDepartmentRoutes = router;