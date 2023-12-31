import {  Model, Types} from "mongoose";
import { IAcademicFaculty } from "../academic-faculty/academic-faculty.interface";
import { IAcademicDepartment } from "../academic-Department/academicDepartment.interface";
import { IAcademicSemester } from "../academic-semester/academic-semester.interface";


export type studentsName = {
    firstName: string;
    middleName: string, 
    lastName : string
}

export type Guardian = {
    fatherName: string, 
    fatherOccupation: string, 
    fatherContactNo: string, 
    motherName: string, 
    motherOccupation: string, 
    motherContactNo: string, 
    address: string,
}

export type LocalGuardian = {
    name: string, 
    occupation: string, 
    contactNo: string, 
    address: string, 
}

export type IStudent = {
    id: string, 
    name: studentsName, 
    gender: 'male' | 'female',
    dateOfBirth: string, 
    email: string, 
    contactNo: string, 
    emergencyContactNo: string, 
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-', 
    presentAddress: string, 
    permanentAddress: string, 
    guardian: Guardian, 
    localGuardian: LocalGuardian, 
    academicFaculty: Types.ObjectId | IAcademicFaculty,
    academicDepartment: Types.ObjectId | IAcademicDepartment;
    academicSemester: Types.ObjectId | IAcademicSemester,
    profileImage?: string, 
}


export type StudentModel = Model<IStudent, Record<string, unknown> >;