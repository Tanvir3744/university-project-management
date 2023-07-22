// business logic held in here
import {  IAcademicSemester } from "./academic-semester.interface";
import { AcadmicSemester } from "./academic-semester.models";

const createAcademicSemester =async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    const result = await AcadmicSemester.create(payload);
    return result;
}