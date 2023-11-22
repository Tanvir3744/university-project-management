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
      }),
    }),
  }),
})

/* await createUserZodSchema.parseAsync(req); */

export const userValidation = {
  createUserZodSchema,
}
