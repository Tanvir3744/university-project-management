import { Model, Schema, model } from "mongoose";
import { AcademicFacultyModel, IAcademicFaculty } from "./academic-faculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>({
    title: {
        type: String,
        required: true,
    }
});

const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>('AcademicFaculty', academicFacultySchema);