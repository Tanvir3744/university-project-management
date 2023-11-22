import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.services";
import { IAcademicDepartment } from "./academicDepartment.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";


const createAcademicDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicDepartmentData } = req.body;
    const result = await AcademicDepartmentServices.createAcademicDepartment(academicDepartmentData);
    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department has successfully been created",
        data: result,
    });
    next();
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AcademicDepartmentServices.getSingleDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "Academic Department Sucessfully retrived",
        data: result,
    })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, ["title", 'searchTerm'])
    const result = await AcademicFacultyServices.getAllFaculty(paginationOptions, filters);
    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "all faculties has been retrived successfully!",
        data: result.data,
        meta: result.meta
    })
    next();
});

export const AcademicDepartmentControllers = {
    createAcademicDepartment, 
    getSingleDepartment
}