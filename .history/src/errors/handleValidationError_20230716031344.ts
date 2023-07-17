import { IGenericErrorMessage } from "../interfaces/error";

import mongoose, { Error as MongooseError, Error.ValidationError } from 'mongoose';

const handleValidationError = (err: MongooseError.ValidationError) => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map((elem: MongooseError.ValidationError | mongoose.Error.CastError) => {
        if (elem instanceof mongoose.Error.ValidationError) {
            return {
                elem: elem.path,
                message: elem.message,
            };
        } else {
            // Handle CastError here if needed
        }
    });
};

