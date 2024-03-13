"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidationZodSchema = void 0;
const zod_1 = require("zod");
const updateStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            middleName: zod_1.z.string({
                required_error: 'middle name is required',
            }).optional(),
            lastName: zod_1.z.string({
                required_error: 'last name is required',
            }).optional(),
        }).optional(),
        dateOfBirth: zod_1.z.string({
            required_error: 'Date of birth is required',
        }).optional(),
        gender: zod_1.z.enum(['male', 'female'], {
            required_error: 'gender is required',
        }).optional(),
        bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
            required_error: 'blood group is required',
        }).optional(),
        email: zod_1.z.string({
            required_error: 'email is required',
        }).optional(),
        contactNo: zod_1.z.string({
            required_error: 'contact number is required',
        }).optional(),
        emergencyContactNo: zod_1.z.string({
            required_error: 'emergency contact number is required',
        }).optional(),
        presentAddress: zod_1.z.string({
            required_error: 'present address is required',
        }).optional(),
        permanentAddress: zod_1.z.string({
            required_error: 'permanent address is required',
        }).optional(),
        guardian: zod_1.z.object({
            fatherName: zod_1.z.string({
                required_error: 'father name is required',
            }).optional(),
            fatherOccupation: zod_1.z.string({
                required_error: 'father occupation is required',
            }).optional(),
            fatherContactNo: zod_1.z.string({
                required_error: "father's contact number is required",
            }).optional(),
            motherName: zod_1.z.string({
                required_error: 'mother name is required',
            }).optional(),
            motherOccupation: zod_1.z.string({
                required_error: 'Mother occupation is required',
            }).optional(),
            motherContactNo: zod_1.z.string({
                required_error: 'Mother contact number is required',
            }).optional(),
            address: zod_1.z.string({
                required_error: 'Guardian address is required',
            }).optional(),
        }).optional(),
        localGuardian: zod_1.z.object({
            name: zod_1.z.string({
                required_error: 'Local guardian name is required',
            }).optional(),
            occupation: zod_1.z.string({
                required_error: 'Local guardian occupation is required',
            }).optional(),
            contactNo: zod_1.z.string({
                required_error: 'Local guardian contact number is required',
            }).optional(),
            address: zod_1.z.string({
                required_error: 'Local guardian address is required',
            }).optional(),
        }).optional(),
    })
});
exports.StudentValidationZodSchema = {
    updateStudentZodSchema
};
