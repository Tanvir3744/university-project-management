
import z from 'zod';

const authValidationZodSchema = z.object({
    body: z.object({
        
    })
})

export const AuthValidation = {
    authValidationZodSchema,
}