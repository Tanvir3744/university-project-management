import mongoose, { ValidationError, CastError } from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (err: mongoose.Error.ValidationError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map((elem: ValidationError | CastError) => {
        return {
            path: (elem as ValidationError)?.path || (elem as CastError)?.stringValue,
            message: elem.message,
        };
    });

    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessages: errors,
    };
};

export default handleValidationError;
