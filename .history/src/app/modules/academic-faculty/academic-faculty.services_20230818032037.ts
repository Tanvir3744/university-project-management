import { SortOrder } from "mongoose";
import { pagintationHelpers } from "../../../helper/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicFaculty } from "./academic-faculty.interface";
import { AcademicFacultyModels } from "./academic-faculty.model";


const createFaculties = (payload:IAcademicFaculty ) => {
    const result = AcademicFacultyModels.create(payload);
    return result;
}

const getSingleFaculty = async (id:string) : Promise<IAcademicFaculty  | null> => {
    const result = await AcademicFacultyModels.findById(id);
    return result;
}
const getAllFaculties = async (paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAcademicFaculty[]>> => {


    // these are for pagination and sort functionality...
    const { page, limit, sortBy, sortOrder, skip } = pagintationHelpers.calculatePagination(paginationOptions);
    
    const sortCondition: {[key:string]: SortOrder} = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    const result = await AcademicFacultyModels.find().sort().limit(limit).skip(skip);
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
    getAllFaculties
}
