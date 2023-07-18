import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path,
      message: issue?.message,
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  }
}

export default handleZodError
