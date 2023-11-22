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
  ).lean();

  let newUserAllData = null
  const session = await mongoose.startSession()

  //generate auto incremental id ;
  try {
    session.startTransaction()

    //generate student id ;
    const id = await generateStudentId(academic_semester)
    user.id = id
    student.id = id

    //creating new student into database using session storage
    const createNewStudent = await Student.create([student], { session })


    //if createnewstudent is empty will throw this error...
    if (!createNewStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create student')
    }

    // push new students id into user.student which is coming from user model...
    user.student = createNewStudent[0]._id

    // creating new user while we already created a new student...
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user')
    }

    newUserAllData = newUser[0]

    // after creating these whole stuff we need to commit the entire work ....
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    // if there is any error thrown for any reason ....
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment ',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  
console.log(newUserAllData)

  return newUserAllData

  /*   // create user into database;
  const createdUser = await User.create(user)
  // if the user throw eny error (validation)
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user')
  }
  return createdUser */
}

export const UserService = {
  createStudent,
}
