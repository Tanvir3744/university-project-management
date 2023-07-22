// business logic held in here
import ApiError from "../../../errors/apiErrors";
import { academicSemesterAndCodeMapper } from "./academic-constants";
import {  IAcademicSemester } from "./academic-semester.interface";
import { AcademicSemester } from "./academic-semester.models";
import status from "http-status";

const createAcademicSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    if (academicSemesterAndCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(status)
    }

    const result = await AcademicSemester.create(payload);

    return result;
}

export const AcademicSemesterService = {
    createAcademicSemester
}