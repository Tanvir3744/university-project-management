import { Request, Response } from 'express';
import { UserService } from './user_service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from "http-status";



const createStudent = catchAsync(async (req: Request, res: Response) => {

  
  // grab users data from server
  const {student, ...userData } = req.body
  console.log(student)
  const result = await UserService.createStudent(student, userData)
  console.log(result)
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true, 
    message: "Successfully student  has been created", 
    data: result
  });
})

export const UserController = {
  createStudent,
}
