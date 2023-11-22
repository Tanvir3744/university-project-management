import { IAcademicFaculty } from "./academic-faculty.interface";
import { AcademicFacultyModels } from "./academic-faculty.model";


const createFaculties = (payload:IAcademicFaculty ) => {
    const result = AcademicFacultyModels.create(payload);
    return result;
}

const getSingleFaculty = async (id:string) : Promise<IAcademicFaculty  | null> => {
    const result = await AcademicFacultyModels.findOne(id);
    return result;
}


export const AcademicFacultyServices = {
    createFaculties,
    getSingleFaculty
}