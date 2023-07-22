import { z } from 'zod'
import { academicCodes, academicTitle } from './academic-constants'


const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'Year is required to create semester',
    }),
    code: z.enum([...academicCodes] as [string, ...string[]], {
      required_error: 'code is required to create semester',
    }),
    startMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'start month is required to create semester',
      }
    ),
    endMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'end month is required to create semester',
      }
    ),
  }),
})

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
}
