import {NextFunction, Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { AcademicFacultyServices } from "./academic-faculty.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAcademicFaculty } from "./academic-faculty.interface";

const createFaculty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {...academicFacultiesData} = req.body;
    const result = await AcademicFacultyServices.createFaculties(academicFacultiesData);
    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "Academic Faculty has been created",
        data: result,
    })
});
