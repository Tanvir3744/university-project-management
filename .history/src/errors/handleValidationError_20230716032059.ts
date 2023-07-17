import mongoose, { ValidatorError, CastError } from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map((elem: ValidatorError | CastError) => {
        return {
            path: (elem as ValidatorError)?.path || (elem as CastError)?.stringValue,
            message: elem.message,
        };
    });

    const statusCode = 400;
    return {
        //start from here
    }
};
