import express from 'express'
import { AcademicFacultyController } from './academic-faculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academic-faculty.validation'

//import router from express router function ;
const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyZodSchema),
  AcademicFacultyController.createFaculty
)

router.get('/:id', AcademicFacultyController.getSingleFaculty)

router.patch("/:id", validateRequest(AcademicFacultyValidation.academicFacultyZodSchema), AcademicFacultyController.updateAcademicFaculties)

router.get('/', AcademicFacultyController.getAllFaculties);

router.delete("/:id", AcademicFacultyController.deleteAcademicFaculties)

export const AcademicFacultyRoutes = router
