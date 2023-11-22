import { z } from "zod";

const updateStudentZodSchema = z.object({
  body: z.object({
      name: z.object({
          firstName: z.string({
            required_error: 'First name is required',
          }),
          middleName: z.string({
              required_error: 'middle name is required',
          }).optional(),
          lastName: z.string({
              required_error: 'last name is required',
          }).optional(),
      }).optional(),

      dateOfBirth: z.string({
          required_error: 'Date of birth is required',
      }).optional(),

      gender: z.enum(['male', 'female'], {
          required_error: 'gender is required',
      }).optional(),

      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
          required_error: 'blood group is required',
      }).optional(),

      email: z.string({
          required_error: 'email is required',
      }).optional(),

      contactNo: z.string({
          required_error: 'contact number is required',
      }).optional(),

      emergencyContactNo: z.string({
          required_error: 'emergency contact number is required',
      }).optional(),

      presentAddress: z.string({
          required_error: 'present address is required',
      }).optional(),

      permanentAddress: z.string({
          required_error: 'permanent address is required',
      }).optional(),

      guardian: z.object({
          fatherName: z.string({
              required_error: 'father name is required',
          }).optional(),
          fatherOccupation: z.string({
              required_error: 'father occupation is required',
          }).optional(),
          fatherContactNo: z.string({
              required_error: "father's contact number is required",
          }).optional(),
          motherName: z.string({
              required_error: 'mother name is required',
          }).optional(),
          motherOccupation: z.string({
              required_error: 'Mother occupation is required',
          }).optional(),
          motherContactNo: z.string({
              required_error: 'Mother contact number is required',
          }).optional(),
          address: z.string({
              required_error: 'Guardian address is required',
          }).optional(),
      }).optional(),

      localGuardian: z.object({
          name: z.string({
              required_error: 'Local guardian name is required',
          }).optional(),
          occupation: z.string({
              required_error: 'Local guardian occupation is required',
          }).optional(),
          contactNo: z.string({
              required_error: 'Local guardian contact number is required',
          }).optional(),
          address: z.string({
              required_error: 'Local guardian address is required',
          }).optional(),
      }).optional(),
  })
});


export const StudentValidationZodSchema = {
    updateStudentZodSchema
}