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

// for updated data validation 
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicTitle] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z
        .enum([...academicCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicMonths] as [string, ...string[]], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...academicMonths] as [string, ...string[]], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );


export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema
}
