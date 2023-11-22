import { User } from './user.model'
import { IUser } from './users.interface'
import config from '../../../config/index'
import { generateStudentId } from '../../../utils/user.utils'
import ApiError from '../../../errors/apiErrors'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academic-semester/academic-semester.models'
// create user service
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // set user id;
  user.id = id

  // set default pasword
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  user.role = 'student'
  const academic_semester = await AcademicSemester.findById(
    student.academicSemester
  )

  //generate auto incremental id ;
    const id = await generateStudentId(academic_semester);

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
