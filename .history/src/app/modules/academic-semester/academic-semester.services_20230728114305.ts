// business logic held in here
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/apiErrors'
import { pagintationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptionsTypes } from '../../../interfaces/pagination'
import { academicSemesterAndCodeMapper } from './academic-constants'
import { IAcademicFilter, IAcademicSemester } from './academic-semester.interface'
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

const getAllSemestersService = async (filters:IAcademicFilter , paginationOptions: IpaginationOptionsTypes): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = pagintationHelpers.calculatePagination(paginationOptions)
  

  // sortconditions for dynamic sorting
  const sortCondition: {[key:string]: SortOrder} = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemestersService,
}
