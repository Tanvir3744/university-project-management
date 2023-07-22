import { RequestHandler } from "express"
import { AcademicSemesterService } from "./academic-semester.services"

const createAcademicSemester: RequestHandler = async (req, res, next) => {
    try {  
  
      // grab data from server
      const { ...academicSemesterData } = req.body
      const result = await AcademicSemesterService.createAcademicSemester(academicSemesterData)
      console.log(result)
      res.status(200).json({
        status: 'Success',
        message: 'Successfully academic semester has been created',
        data: result,
      })
    } catch (err) {
      next(err)
    }
}
  
export const AcademicSemesterController = {
    createAcademicSemester
}