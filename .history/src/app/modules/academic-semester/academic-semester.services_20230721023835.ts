// business logic held in here
import {  IAcademicSemester } from "./academic-semester.interface";
import { AcademicSemester } from "./academic-semester.models";

const createAcademicSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    
    
    const result = await AcademicSemester.create(payload);

    return result;
}

export const AcademicSemesterService = {
    createAcademicSemester
}