import { Schema, model } from "mongoose";
import { IStudent, StudentModel } from "./student.interface";

export const StudentSchema = new Schema<IStudent, StudentModel>({
    id: {
        type: String, 
        required: true, 
        unique: true, 
    },
    name: {
        type: {
            firstName: {
                type: String, 
            }, 
            middleName: {
                type: String, 
            }, 
            lastName: {
                type: String, 
                required: true, 
            },
        },
    },

    gender: {
        type: String, 
        enum: ['male', "female"],
        required: true, 
    }, 
    dateOfBirth: {
        type: String, 
        required: true, 
    },
    email: {
        type: String, 
        unique: true, 
        required: true, 
    }, 
    contactNo: {
        type: String, 
        required: true, 
        unique: true, 
    },
    emergencyContactNo: {
        type: String, 
        required: true, 
        unique: true, 
    },
    presentAddress: {
        type: String, 
        required: true, 
    },
    permanentAddress: {
        type: String, 
        required: true, 
    },
    bloodGroup: {
        type: String, 
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+','AB-']
    }, 
    guardian: {
        required: true, 
        type: {
            fatherName: {
                type: String, 
                required: true, 
            },
            fatherOccupation: {
                type: String, 
                required: true, 
            },
            fatherContactNo: {
                type: String, 
                required: true,
            }, 
            motherName: {
                type: String, 
                required: true, 
            },
            motherOccupation: {
                type: String, 
                required: true, 
            }, 
            motherContactNo: {
                type: String, 
                required: true, 
            }, 
            address: {
                type: String, 
                required: true, 
            },
        },
    },

    localGuardian: {
        required: true, 
        type: {
            name: {
                type: String, 
                required: true, 
            }, 
            occupation: {
                type: String, 
                required: true, 
            },
            contactNo: {
                type: String, 
                required: true, 
            },
            address: {
                type: String, 
                required: true, 
            },
        },
    },

    profileImage: {
        type: String, 
        /* required: true, */ 
    }, 
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true, 
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: "AcademicDepartment",
        required: true, 
    },
    academicFaculty: {
        type: Schema.Types.ObjectId, 
        ref: 'AcademicFaculty',
        required: true, 
    } 
},{ timestamps: true, toJSON: { virtuals: true } })
 
export const Student = model < IStudent, StudentModel>('Student', StudentSchema )