import {  Schema, model} from 'mongoose'
import { IAcademicSemester, UserModel } from './academic-semester.interface'


export const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const User = model<IUser, UserModel>('User', userSchema);

