import {  Schema, model} from 'mongoose'
import { IAcademicSemester, AcademicSemesterModel } from './academic-semester.interface'
import { academicMonths, academicTitle } from './academic-constants';



export const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: {
        type: String, 
        required: true, 
        enum :academicTitle,
    },
    year: {
        type: Number,
        required: true,
    },
    code: {
        type: String, 
        required:true,
        enum : ["01", "02", "03"]
    },
    startMonth: {
        type: String,
        required: true,
        enum: academicMonths
    },
    endMonth: {
        type: String,
        required: true, 
        enum:  academicMonths
    }
    
}, { timestamps: true });

export const AcadmicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema);

