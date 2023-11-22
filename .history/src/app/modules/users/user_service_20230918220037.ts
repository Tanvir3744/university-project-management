import { User } from './user.model'
import { IUser } from './users.interface'
import config from '../../../config/index'
import { generateStudentId } from '../../../utils/user.utils'
import ApiError from '../../../errors/apiErrors'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academic-semester/academic-semester.models'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
// create user service
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // set user id;

  // set default pasword
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  user.role = 'student'
  const academic_semester = await AcademicSemester.findById(
    student.academicSemester
  )

  const session = await mongoose.startSession()

  //generate auto incremental id ;
  try {
    session.startTransaction()
    const id = await generateStudentId(academic_semester)
    user.id = id
    student.id = id

    const createNewStudent = await Student.create([student], { session })

    if (!createNewStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create student')
    }

    user.student = createNewStudent[0]._id;
    const newUser = await User.create([user])

  } catch (error) {
    console.log(error)
  }

  // create user into database;
  const createdUser = await User.create(user)

  // if the user throw eny error (validation)
  if (!createdUser) {
    throw new ApiError(400, 'failed to create user')
  }

  return createdUser
}

export const UserService = {
  createStudent,
}
