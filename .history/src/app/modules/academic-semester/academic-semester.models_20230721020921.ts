import {  Schema, model} from 'mongoose'
import { IAcademicSemester, AcademicSemesterModel } from './academic-semester.interface'
import { academicCodes, academicMonths, academicTitle } from './academic-constants';
import status from "http-status";
import ApiError from '../../../errors/apiErrors';




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
        enum : academicCodes
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

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema);


//same year and same semester dupllication validation (pre-hook and post-hook);

academicSemesterSchema.pre("save", async function(next){
    const isExist = await AcademicSemester.findOne({ title: this.title, year: this.year });
    if (isExist) {
        throw new ApiError(status.CONFLICT, 'Academic Semester is already Exist');
    }
    next();
})

