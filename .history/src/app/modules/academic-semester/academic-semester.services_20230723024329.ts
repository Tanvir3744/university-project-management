// business logic held in here
import ApiError from '../../../errors/apiErrors'
import { academicSemesterAndCodeMapper } from './academic-constants'
import { IAcademicSemester } from './academic-semester.interface'
import { AcademicSemester } from './academic-semester.models'
import status from 'http-status'

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // semester title and code matching validation
  if (academicSemesterAndCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      status.BAD_REQUEST,
      'Semester Title and code did not matched each other'
    )
  }

  const result = await AcademicSemester.create(payload)

  return result
}

const getAllSemesters = () => {}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
}
