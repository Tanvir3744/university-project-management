import {  Schema, model} from 'mongoose'
import { IAcademicSemester, AcademicSemesterModel } from './academic-semester.interface'


export const userSchema = new Schema<IAcademicSemester>({
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

export const User = model<IAcademicSemester, AcademicSemesterModel>('User', userSchema);

