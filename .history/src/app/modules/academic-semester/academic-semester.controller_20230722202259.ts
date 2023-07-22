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
 /*  res.status(200).json({
    status: 'Success',
    message: 'Successfully academic semester has been created',
    data: result,
  }) */

  sendResponse(res, {
    statusCode: httpStatus.Ok,
    success: true, 
    message: "Successfully academic semester has been created"
  });
})
  
export const AcademicSemesterController = {
    createAcademicSemester
}