import {  Schema, model} from 'mongoose'
import { IAcademicSemester, AcademicSemesterModel } from './academic-semester.interface'


export const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: {
        type: String, 
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    code: {
        type: String, 
        required:true,
    },
    startMonth: {
        type: String,
        required: true,
    },
    endMonth: {
        type: String,
        required: true
    }
    
}, { timestamps: true });

export const User = model<IAcademicSemester, AcademicSemesterModel>('Academic-Semester', academicSemesterSchema);

