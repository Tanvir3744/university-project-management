import { Model, Schema, model } from "mongoose";
import { IAcademicFaculty } from "./academic-faculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>({
    title: {
        type: String,
        required: true, 
    }
})