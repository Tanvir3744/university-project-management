import {  Schema, model} from 'mongoose'
import { IAcademicSemester, AcademicSemesterModel } from './academic-semester.interface'


const IMonth =  [
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
    },
    code: {
        type: String, 
        required:true,
        enum : ["01", "02", "03"]
    },
    startMonth: {
        type: String,
        required: true,
        enum: IMonth,
    },
    endMonth: {
        type: String,
        required: true, 
        enum:  IMonth
    }
    
}, { timestamps: true });

export const AcadmicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema);

