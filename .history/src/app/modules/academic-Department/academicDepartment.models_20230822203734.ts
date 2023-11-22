import { Schema } from 'mongoose'
import { IAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<IAcademicDepartment>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
}, {timestamps: true, toJSON: {virtuals: true}})
