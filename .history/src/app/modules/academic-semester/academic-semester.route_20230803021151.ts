import express from 'express'
import { academicSemesterValidation } from './academicValidation'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academic-semester.controller'

const router = express.Router()

// create semester using this route
router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
)

// to get single semester 
router.get('/:id', AcademicSemesterController.getSingleSemester)

// to update desired data use this route...
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
)
// to get all semesters from the Semester_collection of database
router.get('/', AcademicSemesterController.getAllSemesters)

// to delete semester
router.delete("/:id", AcademicSemesterController.deleteSemester)
export const AcademicSemesterRoutes = router
