"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
// these validations will be written according to the structure of users data based on their role.
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({
            required_error: 'password is required',
        })
            .optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'middle name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'last name is required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            gender: zod_1.z.enum(['male', 'female'], {
                required_error: 'gender is required',
            }),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
                required_error: 'blood group is required',
            }),
            email: zod_1.z.string({
                required_error: 'email is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'contact number is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'emergency contact number is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'permanent address is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'father name is required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'father occupation is required',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: "father's contact number is required",
                }),
                motherName: zod_1.z.string({
                    required_error: 'mother name is required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation is required',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Guardian address is required',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Local guardian name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local guardian occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local guardian contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Local guardian address is required',
                }),
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
/* await createUserZodSchema.parseAsync(req); */
exports.userValidation = {
    createUserZodSchema,
};
