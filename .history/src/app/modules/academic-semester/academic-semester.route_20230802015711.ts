import express from 'express'
import { academicSemesterValidation } from './academicValidation'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academic-semester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
)

router.patch("/:id", AcademicSemesterController.updateAcademicSemester)
router.get('/', AcademicSemesterController.getAllSemesters);
router.get("/:id", AcademicSemesterController.getSingleSemester);
export const AcademicSemesterRoutes = router