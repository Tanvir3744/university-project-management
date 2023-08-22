import {z} from "zod"

const academicFacultyZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        })
    })
})

export const AcademicFacultyValidation = {
    academicFacultyZodSchema
}