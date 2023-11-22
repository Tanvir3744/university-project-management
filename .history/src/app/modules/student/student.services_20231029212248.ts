// business logic held in here
import { SortOrder } from 'mongoose'
import { pagintationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IStudent, IStudentFilter } from './student.interface'
import { Student } from './student.model'
import { studentSearchableFields } from './student.constants'
import ApiError from '../../../errors/apiErrors'
import httpStatus from 'http-status'

const getAllStudentService = async (
  filters: IStudentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  //logic and conditions for implement search functionality

  const { searchTerm, ...filtersData } = filters

  const searchConditionWithAnd = []

  if (searchTerm) {
    searchConditionWithAnd.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // filter data using this funciton
  if (Object.keys(filtersData).length) {
    {
      searchConditionWithAnd.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      })
    }
  }

  // declare type for pagination options
  const { page, limit, skip, sortBy, sortOrder } =
    pagintationHelpers.calculatePagination(paginationOptions)

  // sortconditions for dynamic sorting
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  //if got any rejection without filtering and sorting api and this is holding all logics here
  const whereCondition =
    searchConditionWithAnd.length > 0 ? { $and: searchConditionWithAnd } : {}

  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort()
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments(searchConditionWithAnd)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// get single semester service...
const getSingleStudentService = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
  return result
}

//update data of academic-semester
const updateStudentService = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {

  // check whether a student is exist or not 
  const isExist = Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student is not found');
  }

  const { guardian, localGuardian, name, ...studentData } = payload;

  // copy student data
  const updatedStudentData:Partial<IStudent> = { ...studentData };

  // convert student data into an array and make specific updates on them 
  if (name && Object.keys(name).length> 0 ) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>; //name.firstName | name.lastName --> output
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length> 0 ) {
    Object.keys(guardian).forEach(key => {
      const guardiankey = `name.${key}` as keyof Partial<IStudent>; //name.firstName | name.lastName --> output
      (updatedStudentData as any)[guardiankey] = guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length> 0 ) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardiankey = `name.${key}` as keyof Partial<IStudent>; //name.firstName | name.lastName --> output
      (updatedStudentData as any)[localGuardiankey] = localGuardian[key as keyof typeof localGuardian];
    });
  }
  

  const result = await Student.findOneAndUpdate({ _id: id }, updatedStudentData, {
    new: true,
  })
  return result
}

const deleteStudentService = async (id: string) => {
  const result = await Student.findByIdAndDelete(id)
  return result
}

export const StudentService = {
  getAllStudentService,
  getSingleStudentService,
    updateStudentService,
  deleteStudentService,
}
