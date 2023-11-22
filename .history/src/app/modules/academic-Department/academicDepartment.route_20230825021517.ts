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
)

router.get('/:id', AcademicDepartmentControllers.getSingleDepartment)

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentControllers.updateDepartment
)


router.get('/', AcademicDepartmentControllers.getAllDepartments)

router.delete("/:id",AcademicDepartmentControllers.deleteDepartment)

export const AcademicDepartmentRoutes = router
