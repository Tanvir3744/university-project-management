import {NextFunction, Request, Response } from "express"
import { AcademicSemesterService, getAllSemestersService } from "./academic-semester.services"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import pick from "../../../shared/pick"
import { paginationFields } from "../../../constants/paginationFields"
import { IAcademicSemester } from "./academic-semester.interface"


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

  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicSemesterService.getAllSemestersService(paginationOptions);

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true, 
    message: "Successfully academic semester has been retrived", 
    data: result.data || null,
    meta: result.meta ||null,
  });
  next()
})

  
export const AcademicSemesterController = {
  createAcademicSemester, 
  getAllSemesters
}