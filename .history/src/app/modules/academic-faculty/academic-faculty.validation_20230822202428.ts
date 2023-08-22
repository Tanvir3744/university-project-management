import {z} from "zod"

const academicFacultyZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        })
    })
})

const updateAcademicFacultyZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
    })
})
export const AcademicFacultyValidation = {
    academicFacultyZodSchema,
    updateAcademicFacultyZodSchema, 
}