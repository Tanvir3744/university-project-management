import { z } from "zod";


// these validations will be written according to the structure of users data based on their role. 
const createUserZodSchema = z.object({
    body: z.object({
      password: z.string({
        required_error: 'password is required',
      }), 
      student: z.object({

      })
      })
})

/* await createUserZodSchema.parseAsync(req); */

export const userValidation = {
    createUserZodSchema
}
