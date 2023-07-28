// business logic held in here
import ApiError from '../../../errors/apiErrors'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptionsTypes } from '../../../interfaces/pagination'
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

// declare type for pagination options


const getAllSemestersService = async (paginationOptions: IpaginationOptionsTypes):Promise<IGenericResponse<IAcademicSemester []>> => {
  const { page = 1, limit = 10 } = paginationOptions
  const skip = page - 1 * limit
  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit, 
      total,
    }, 
    data: result,
  };
}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemestersService,
}
