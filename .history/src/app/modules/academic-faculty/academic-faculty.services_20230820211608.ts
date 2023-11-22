import { SortOrder } from "mongoose";
import { pagintationHelpers } from "../../../helper/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicFaculty, IAcademicFacultyFilters } from "./academic-faculty.interface";
import { AcademicFacultyModels } from "./academic-faculty.model";
import { academicFacultySearchableField, academicFacultySearchableFiled } from "./academic-faculty.constants";


const createFaculties = (payload:IAcademicFaculty ) => {
    const result = AcademicFacultyModels.create(payload);
    return result;
}

const getSingleFaculty = async (id:string) : Promise<IAcademicFaculty  | null> => {
    const result = await AcademicFacultyModels.findById(id);
    return result;
}

const getAllFaculty = async (paginationOptions: IPaginationOptions, filters: IAcademicFacultyFilters): Promise<IGenericResponse<IAcademicFaculty[]>> => {
   
    //filtering and searching with keywords
    const { searchTerm, ...filtersData } = filters;
    const searchAndfilterCondition = [];
    if (searchTerm) {
        searchAndfilterCondition.push({
            $or: academicFacultySearchableField.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });        
    }

    console.log(Object.keys(filtersData).length, "filters data")

    // these are for pagination and sort functionality...
    const { page, limit, sortBy, sortOrder, skip } = pagintationHelpers.calculatePagination(paginationOptions);
    
    const sortCondition: {[key:string]: SortOrder} = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const whereCondition = searchAndfilterCondition.length > 0 ? { $and: searchAndfilterCondition } : {};

    const result = await AcademicFacultyModels.find(whereCondition).sort(sortCondition).limit(limit).skip(skip);
    const total = await AcademicFacultyModels.countDocuments();
    return {
        meta: {
            page, 
            limit, 
            total
        },
        data: result,
    }
}

export const AcademicFacultyServices = {
    createFaculties,
    getSingleFaculty,
    getAllFaculty
}
