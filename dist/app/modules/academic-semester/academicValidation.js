"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterValidation = void 0;
const zod_1 = require("zod");
const academic_constants_1 = require("./academic-constants");
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academic_constants_1.academicTitle], {
            required_error: 'title is required',
        }),
        year: zod_1.z.string({
            required_error: 'Year is required to create semester',
        }),
        code: zod_1.z.enum([...academic_constants_1.academicCodes], {
            required_error: 'code is required to create semester',
        }),
        startMonth: zod_1.z.enum([...academic_constants_1.academicMonths], {
            required_error: 'start month is required to create semester',
        }),
        endMonth: zod_1.z.enum([...academic_constants_1.academicMonths], {
            required_error: 'end month is required to create semester',
        }),
    }),
});
// for updated data validation 
const updateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academic_constants_1.academicTitle], {
            required_error: 'Title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Year is required ',
        })
            .optional(),
        code: zod_1.z
            .enum([...academic_constants_1.academicCodes])
            .optional(),
        startMonth: zod_1.z
            .enum([...academic_constants_1.academicMonths], {
            required_error: 'Start month is needed',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academic_constants_1.academicMonths], {
            required_error: 'End month is needed',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either both title and code should be provided or neither',
});
exports.academicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema
};
