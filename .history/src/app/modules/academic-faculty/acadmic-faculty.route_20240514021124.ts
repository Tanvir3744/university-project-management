import express from 'express'
import { AcademicFacultyController } from './academic-faculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academic-faculty.validation'
import authValidation from '../../middlewares/auth.middleware'
import { ENUM_USER_ROLE } from '../../../enums/users'

//import router from express router function ;
const router = express.Router()

router.post(
  '/create-academic-faculty',
  authValidation("admin", "superAdmin", "faculty"),
  validateRequest(AcademicFacultyValidation.academicFacultyZodSchema),
  AcademicFacultyController.createFaculty
)

router.get('/:id',authValidation(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY), AcademicFacultyController.getSingleFaculty)

router.patch("/:id", validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema), AcademicFacultyController.updateAcademicFaculties)

router.get('/', AcademicFacultyController.getAllFaculties);

router.delete("/:id", AcademicFacultyController.deleteAcademicFaculties)

export const AcademicFacultyRoutes = router
