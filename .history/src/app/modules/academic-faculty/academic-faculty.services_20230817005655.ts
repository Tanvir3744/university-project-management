import { IAcademicFaculty } from "./academic-faculty.interface";
import { AcademicFacultyModels } from "./academic-faculty.model";


const createFaculties = (payload:IAcademicFaculty ) => {
    const result = AcademicFacultyModels.create(payload);
    return result;
}

const getSingleFaculty = (payload:id) => {
    const result = AcademicFacultyModels.findOne(id)
}


export const AcademicFacultyServices = {
    createFaculties,
}