import {z} from "zod"
const academicDepartmentZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Department title is required",
        }),
        academicFaculty: z.string({
            required_error: "Academic Faculty is required",
        })
    })
});
