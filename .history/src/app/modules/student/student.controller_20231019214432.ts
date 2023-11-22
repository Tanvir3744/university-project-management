import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/paginationFields'
import { IStudent } from './student.interface'
import { StudentService } from './student.services'

// const get all semesters
const getAllStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // search functionality
    const filters = pick(req.query, [
      'searchTerm',
      'title',
      'code',
      'year',
      'startMonth',
      'endMonth',
    ])
    // pagination functionality
    const paginationOptions = pick(req.query, paginationFields)

    const result = await StudentService.getAllStudentService(
      filters,
      paginationOptions
    )

    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully academic semester has been retrived',
      data: result.data,
      meta: result.meta,
    })
    next()
  }
)

// get single semester
const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const semesterId = req.params.id
    const result = await StudentService.getSingleStudentService(
      semesterId
    )
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrived sucessfully!',
      data: result,
    })
    next()
  }
)

// update academic semester
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const updateId = req.params.id
  const updateData = req.body
  const result = await StudentService.updateStudentService(
    updateId,
    updateData
  )

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters data updated sucessfully!',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const deleteId = req.params.id
  const result = await StudentService.deleteStudentService(deleteId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters data deleted sucessfully!',
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
