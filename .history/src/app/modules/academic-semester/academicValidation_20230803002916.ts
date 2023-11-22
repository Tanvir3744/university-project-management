import { z } from 'zod'
import { academicCodes, academicMonths, academicTitle } from './academic-constants'


const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
      required_error: 'Year is required to create semester',
    }),
    code: z.enum([...academicCodes] as [string, ...string[]], {
      required_error: 'code is required to create semester',
    }),
    startMonth: z.enum([...academicMonths] as [string, ...string[]],
      {
        required_error: 'start month is required to create semester',
      }
    ),
    endMonth: z.enum([...academicMonths] as [string, ...string[]],
      {
        required_error: 'end month is required to create semester',
      }
    ),
  }),
})

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
}
