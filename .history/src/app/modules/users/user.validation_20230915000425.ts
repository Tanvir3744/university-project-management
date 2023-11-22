import { z } from 'zod'

// these validations will be written according to the structure of users data based on their role.
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
        required_error: 'password is required',
    }).optional(),
    

    student: z.object({

      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),


      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }), 

      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
        required_error: "blood group is required"
      }), 

      email: z.string({
        required_error: "email is required",
      }), 

      contactNo: z.string({
        required_error: 'contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: "emergency contact number is required",
      })

    }),
  }),
})

/* await createUserZodSchema.parseAsync(req); */

export const userValidation = {
  createUserZodSchema,
}
