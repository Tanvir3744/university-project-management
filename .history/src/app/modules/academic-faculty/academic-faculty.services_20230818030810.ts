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
    const {page, limit, sortBy, sortOrder } = pagintationHelpers.calculatePagination(paginationOptions);
    const result = AcademicFacultyModels.find().sort().limit().skip();
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
