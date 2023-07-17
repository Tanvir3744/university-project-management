import  config  from "../../config/index";
import { Request, Response, NextFunction } from "express";
import {IGenericErrorMessage} from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";

const globalErrorHandler = (err, req: Request, res:Response, next:NextFunction) => {
    res.status(400).json({ err: err });

    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessages: IGenericErrorMessage[] = [];
    
    if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        let statusCode = simplifiedError.statusCode;
        let message = simplifiedError.message;
        let errorMessages = simplifiedError.errorMessages;
    }

    // making a pattern for generating errors for simplified messages...
    res.status(statusCode).json({
        sucess: false, 
        message, 
        errorMessages,
        stack: config.env !== "production" ? err.stack : undefined
    })
    next()
}

export default globalErrorHandler;