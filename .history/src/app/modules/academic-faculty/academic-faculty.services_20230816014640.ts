import { IAcademicFaculty } from "./academic-faculty.interface";
import { AcademicFacultyModels } from "./academic-faculty.model";


const createFaculties = (payload:IAcademicFaculty ) => {
    const result = AcademicFacultyModels.create(payload);
    return result;
}

export const AcademicFaculty = {
    createFaculties,
}