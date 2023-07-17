import config from '../../config/index'
import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/apiErrors'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  //handle development and production mode error storage
  config.env === 'development'
    ? console.log('global error handler', err)
    : errorLogger.error('global error handler', err)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {

    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
    
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  // making a pattern for generating errors for simplified messages...
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err.stack : undefined,
  })
  next()
}

export default globalErrorHandler
