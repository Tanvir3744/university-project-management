import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicDepartmentFilterableFields } from "./academicDepartment.constants";
import { IAcademicDepartment, IAcademicDepartmentFilters } from "./academicDepartment.interface";
import { AcademicDepartmentModels } from "./academicDepartment.models";

const createAcademicDepartment = async (payload: IAcademicDepartment): Promise<IAcademicDepartment> => {
    const result = await AcademicDepartmentModels.create(payload);
    return result;
}


const getSingleDepartment = async (id: string):Promise< IAcademicDepartment | null> => {
    const result = await AcademicDepartmentModels.findById(id);
    return result;
}

const getAllDepartments = async (filters: IAcademicDepartmentFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAcademicDepartment[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const andConditionForFilterAndSearch = [];
    if (searchTerm) {
        andConditionForFilterAndSearch.push({
            $or: academicDepartmentFilterableFields.map()
        })
    }
}


export const AcademicDepartmentServices = {
    createAcademicDepartment, 
    getSingleDepartment
}