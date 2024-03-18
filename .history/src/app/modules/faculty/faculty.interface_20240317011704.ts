import { Model, Types } from "mongoose"
import { IAcademicDepartment } from "../academic-Department/academicDepartment.interface"
import { IAcademicFaculty } from "../academic-faculty/academic-faculty.interface"


export type UserName = {
    firstName: string, 
    middleName: string, 
    lastName: string, 
}

export type IFaculty = {
    id: string, 
    name: UserName,
    gender?: 'male' | 'female', 
    dateOfBirth: string, 
    contactNo: string, 
    emergencyContactNo: string, 
    presentAddress: string, 
    permanentAddress: string, 
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    designation: string, 
    profileImage?: string, 
    academicDepartment: Types.ObjectId | IAcademicDepartment,
    academicFaculty :Types.ObjectId | IAcademicFaculty,

}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
    searchTerm?: string;
    id?: string;
    email?: string;
    contactNo?: string;
    emergencyContactNo?: string;
    gender?: 'male' | 'female';
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    academicDepartment?: string;
    academicFaculty?: string;
    designation?: string;
}