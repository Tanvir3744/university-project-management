import { User } from './user.model'
import { IUser } from './users.interface'
import config from '../../../config/index'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from '../../../utils/user.utils'
import ApiError from '../../../errors/apiErrors'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academic-semester/academic-semester.models'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus, { BAD_REQUEST } from 'http-status'
import { IAcademicSemester } from '../academic-semester/academic-semester.interface'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.models'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.models'
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
  ).lean()

  let newUserAllData = null
  const session = await mongoose.startSession()

  //generate auto incremental id ;
  try {
    session.startTransaction()

    //generate student id ;
    const id = await generateStudentId(academic_semester as IAcademicSemester)
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
    console.log(newUser, 'this is new user')

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user')
    }

    newUserAllData = newUser[0]
    console.log(newUserAllData, 'this is new user all data')

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
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

const createAdmin = async (user: IUser, admin: IAdmin) => {
  // if admin does not provide any password then set default password
  if (!user.password) {
    user.password = config.default_admin_pass as string
  }

  // set user role as admin while creating admin as user
  user.role = 'admin'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    //generate admin Id;
    const AdminId = await generateAdminId()
    user.id = AdminId
    admin.id = AdminId

    // create new admin
    const createNewAdmin = await Admin.create([admin], { session })

    if (!createNewAdmin.length) {
      throw new ApiError(BAD_REQUEST, 'Failed to create admin')
    }

    user.admin = createNewAdmin[0]._id

    // create user as admin
    const createNewUser = await User.create([user], { session })

    if (!createNewUser.length) {
      throw new ApiError(BAD_REQUEST, 'Failed to create user')
    }

    //push users and user as admin data into newUserallData array;
    newUserAllData = createNewUser[0]

    // commit and stop transaction;
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  //populate all data from admin
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    })
  }
}

// const create faculty as user
const createFaculty = async (user: IUser, faculty: IFaculty) => {
  // if the password does not set into the faculty
  if (!user.password) {
    user.password = config.deafult_faculty_pass as string
  }

  //set role;
  user.role = 'faculty'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()

    // generate faculty id and set it into the user as well
    const facultyNewId = await generateFacultyId()
    user.id = facultyNewId
    faculty.id = facultyNewId

    // create new faculty;
    const createNewFaculty = await Faculty.create([faculty], { session })

    // if the new faculty does not exist into the database
    if (!createNewFaculty.length) {
      throw new ApiError(BAD_REQUEST, 'failed to create new faculty')
    }

    // new faculty which has been created newly push it into the user
    user.faculty = createNewFaculty[0]._id

    // create new user
    const createNewUser = await User.create([user], { session })

    //if the user does not exist into the database
    if (!createNewUser.length) {
      throw new ApiError(BAD_REQUEST, 'failed to create faculty user')
    }

    // push the entire user data into the newUserAllData array;
    newUserAllData = createNewUser[0]

    //commit transaction and end the session
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    // if there occurs any unexpected errors;
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  // new user all data exist into the database then populate the entire data;
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData._id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicDepartment' }, { path: 'academicFaculty' }],
    })
  }
  return newUserAllData;
}

export const UserService = {
  createStudent,
  createAdmin,
  createFaculty,
}
