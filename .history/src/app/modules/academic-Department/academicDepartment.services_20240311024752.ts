import { SortOrder } from 'mongoose'
import { pagintationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { academicDepartmentFilterableFields } from './academicDepartment.constants'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface'
import { AcademicDepartmentModels } from './academicDepartment.models'

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartmentModels.create(payload)
  return result
}

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartmentModels.findById(id)
  return result
}

const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditionForFilterAndSearch = []

  //for search condition only...
  if (searchTerm) {
    andConditionForFilterAndSearch.push({
      $or: academicDepartmentFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  } // closing if

  // for exact match filtering...
  if (Object.keys(filtersData).length) {
    andConditionForFilterAndSearch.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
    }
    
    //for pagination and sorting data accroding to queries of users
    const { limit=10, page=1, skip, sortBy, sortOrder } = pagintationHelpers.calculatePagination(paginationOptions);
    
    //for sorting and sortby
    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const whereCondition = andConditionForFilterAndSearch.length > 0 ? { $and: andConditionForFilterAndSearch } : {};

    const result = await AcademicDepartmentModels.find(whereCondition).populate("academicFaculty").sort(sortCondition).limit(limit).skip(skip);
    const total = await AcademicDepartmentModels.countDocuments();

    return {
        meta: {
            page, 
            limit, 
            total
        }, 
        data: result,
    }
}

const updateDepartment =async (id: string, payload: Partial<IAcademicDepartment>): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartmentModels.findByIdAndUpdate({ _id: id }, payload, {new:true});
  return result;
}

const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartmentModels.findByIdAndDelete(id);
  return result;
}

export const AcademicDepartmentServices = {
  createAcademicDepartment,
  getSingleDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment
}
