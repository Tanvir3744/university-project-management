import {NextFunction, Request, Response } from "express"
import { AcademicSemesterService} from "./academic-semester.services"
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
  
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true, 
    message: "Successfully academic semester has been created", 
    data: result, 
  });
  next()
})

// const get all semesters
const getAllSemesters = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  // search functionality 
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year', 'startMonth', "endMonth"]);

  // pagination functionality
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemestersService(filters, paginationOptions);

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true, 
    message: "Successfully academic semester has been retrived", 
    data: result.data ,
    meta: result.meta ,
  });
  next()
})


// get single semester
const getSingleSemester = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const semesterId = req.params.id;
  const result = await AcademicSemesterService.getSingleSemesterService(semesterId);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true, 
    message: "Semester retrived sucessfully!", 
    data: result ,
  })
  next();
})
  

// update academic semester
const updateAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const updateId = req.params.id;
  const updateData = req.body;
  const result = await AcademicSemesterService.updateAcademicSemesterService(updateId, updateData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true, 
    message: "Semesters data updated sucessfully!", 
    data: result ,
  })
 
})

export const AcademicSemesterController = {
  createAcademicSemester, 
  getAllSemesters, 
  getSingleSemester,
  updateAcademicSemester
}