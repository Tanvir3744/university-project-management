import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    { path: err.path, message: 'Invalid Object Id' },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error (this is appearing for wrong id)',
    errorMessage: errors,
  }
}
export default handleCastError