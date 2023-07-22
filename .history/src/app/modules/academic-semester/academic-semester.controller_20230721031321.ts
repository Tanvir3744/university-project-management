import { NextFunction, Request, Response } from "express"
import { AcademicSemesterService } from "./academic-semester.services"
import catchAsync from "../../../shared/catchAsync"

const createAcademicSemester = catchAsync(async (req:Request, res:Response, next: NextFunction) => {
  
  // grab data from server
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createAcademicSemester(academicSemesterData)
  console.log(result)
  res.status(200).json({
    status: 'Success',
    message: 'Successfully academic semester has been created',
    data: result,
  })
})
  
export const AcademicSemesterController = {
    createAcademicSemester
}