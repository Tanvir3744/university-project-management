import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";

export type IUser = {
    id: string, 
    role: string,
    password: string,
    student?: Types.ObjectId | IStudent,
    /* faculty?: Types.ObjectId | IFaculty, -- for future use only */ 
    /* admin?: Types.ObjectId | IAdmin */
}

export type UserModel = Model<IUser, object>;