import {NextFunction, Request, Response } from "express"
import { AcademicSemesterService } from "./academic-semester.services"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"

const createAcademicSemester = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  
  // grab data from server
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createAcademicSemester(academicSemesterData)
  next()

  sendResponse(res, {
    statusCode: httpStatus.Ok,
    success: true, 
    message: "Successfully academic semester has been created", 
    data: result
  });
})
  
export const AcademicSemesterController = {
    createAcademicSemester
}