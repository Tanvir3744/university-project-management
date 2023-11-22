import { Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema <IAcademicDepartment>({
    title: {
        type: String, 
        required: true, 
    }
})