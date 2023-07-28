import {NextFunction, Request, Response } from "express"
import { AcademicSemesterService, getAllSemestersService } from "./academic-semester.services"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"

const createAcademicSemester = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  
  // grab data from server
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createAcademicSemester(academicSemesterData)
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true, 
    message: "Successfully academic semester has been created", 
    data: result
  });
  next()
})

// const get all semesters
const getAllSemesters = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
  const paginationOptions = {
    page: Number(req.query.page),
    limit: Number(req.query.limit),
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder,
  };

  const result = await AcademicSemesterService.getAllSemestersService(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true, 
    message: "Successfully academic semester has been retrived", 
    data: result,
  });
  next()
})

  
export const AcademicSemesterController = {
    createAcademicSemester
}