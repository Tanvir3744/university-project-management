import {  Schema, model} from 'mongoose'
import { IAcademicSemester, AcademicSemesterModel } from './academic-semester.interface'


const Month =  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

export const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: {
        type: String, 
        required: true, 
        enum : ["Autumn", "Summer", "Fall"]
    },
    year: {
        type: Number,
        required: true,
        enum : ["01", "02", "03"]
    },
    code: {
        type: String, 
        required:true,
    },
    startMonth: {
        type: String,
        required: true,
        enum: Month
    },
    endMonth: {
        type: String,
        required: true, 
        enum:  Month
    }
    
}, { timestamps: true });

export const AcadmicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema);

