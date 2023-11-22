import { Types } from "mongoose"
import { IAcademicFaculty } from "../academic-faculty/academic-faculty.interface"

export type IAcademicDepartment = {
    title: string, 
    academicFaculty: Types.ObjectId | IAcademicFaculty
}

