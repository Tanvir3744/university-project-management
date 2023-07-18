import { z } from "zod";

export const userValidation = z.object({
    body: z.object({
        role: z.string({
          required_error: "role is required"
        }), 
        password: z.string().optional()
      })
})
