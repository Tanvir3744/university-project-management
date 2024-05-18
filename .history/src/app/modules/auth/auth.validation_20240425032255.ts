
import z from 'zod';

const authValidationZodSchema = z.object({
    body: z.object({
        id: z.string({
            required_error: "ID is required for login",
        }),
        password: z.string({
            required_error: "Password is required for login",
        })
    })
});

const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: "invalid refresh token "
        }),
    })
})

export const AuthValidation = {
    authValidationZodSchema,
    refreshTokenZodSchema
}