import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'

export type IUser = {
  id: string
  role: string
  password: string, 
  needsPasswordChange: true | false,
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId 
  admin?: Types.ObjectId 
}

interface IUserMethods { 
  isUserExist(id: string): Promise<boolean>;
  isPasswordMatched(givenPassword, savedPassword): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods >
