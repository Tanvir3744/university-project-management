import { z } from 'zod'

const Month = [
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
]

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'Year is required to create semester',
    }),
    code: z.enum(['01', '02', '03'], {
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
