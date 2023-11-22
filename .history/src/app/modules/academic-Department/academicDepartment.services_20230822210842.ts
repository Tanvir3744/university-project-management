import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModels } from "./academicDepartment.models";

const createAcademicDepartment = async (payload: IAcademicDepartment): Promise<IAcademicDepartment> => {
    const result = await AcademicDepartmentModels.create(payload);
    return result;
}


const getSingleDepartment = async (id: string):Promise< IAcademicDepartment | null> => {
    const result = await AcademicDepartmentModels.findById(id);
    return result;
}


export const AcademicDepartmentServices = {
    createAcademicDepartment, 
    getSingleDepartment
}