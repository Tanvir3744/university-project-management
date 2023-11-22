import {NextFunction, Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { AcademicFacultyServices } from "./academic-faculty.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAcademicFaculty } from "./academic-faculty.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/paginationFields";

const createFaculty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicFacultiesData } = req.body;
    
    const result = await AcademicFacultyServices.createFaculties(academicFacultiesData);
    
    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "Academic Faculty has been created",
        data: result,
    })
    next();
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const result = await AcademicFacultyServices.getSingleFaculty(id);
    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "Academic Faculty successfully retrived",
        data: result,
    })
    next();
})

const getAllFaculties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, ["title", 'searchTerm']);
    const filters = pick(req.body, paginationFields )
    const result = await AcademicFacultyServices.getAllFaculty(paginationOptions, filters);
    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "all faculties has been retrived successfully!",
        data: result.data,
    })
    next();
})

export const AcademicFacultyController = {
    createFaculty,
    getSingleFaculty,
    getAllFaculties
}