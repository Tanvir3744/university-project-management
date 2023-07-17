import { IGenericErrorMessage } from "../interfaces/error";

import { Error as MongooseError, Error.ValidationError } from 'mongoose';

const handleValidationError = (err: MongooseError.ValidationError) => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map((elem: MongooseError.ValidationError) => {
        return {
            elem: elem?.path,
            message: elem.message,
        };
    });
};
