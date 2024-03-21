import { z } from 'zod'

// these validations will be written according to the structure of users data based on their role.
const createUserZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'password is required',
      })
      .optional(),

    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }),

      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
        required_error: 'blood group is required',
      }),

      email: z.string({
        required_error: 'email is required',
      }),

      contactNo: z.string({
        required_error: 'contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'permanent address is required',
      }),

      guardian: z.object({
        fatherName: z.string({
          required_error: 'father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: "father's contact number is required",
        }),
        motherName: z.string({
          required_error: 'mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({
          required_error: 'Guardian address is required',
        }),
      }),

      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),

      profileImage: z.string().optional(),
    }),
  }),
})

/* await createUserZodSchema.parseAsync(req); */
const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),
      gender: z.string({
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z
        .string({
          required_error: 'Blood group is required',
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),

      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      profileImage: z
        .string({
          required_error: 'Profile Image is required',
        })
        .optional(),
    }),
  }),
});

// zod validation for admin
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.string({
        required_error: 'Gender is required',
      }),

      bloodGroup: z.string({
        required_error: 'Blood group is required',
      }),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),

      designation: z.string({
        required_error: 'Designation is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});


export const userValidation = {
  createUserZodSchema,
  createFacultyZodSchema
}
