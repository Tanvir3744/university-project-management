import  config  from "../../config/index";
import { Request, Response, NextFunction } from "express";
import {IGenericErrorMessage} from "../../interfaces/error";

const globalErrorHandler = (err, req: Request, res:Response, next:NextFunction) => {
    res.status(400).json({ err: err });




    const statusCode = 500;
    const message = "Something went wrong";
    const errorMessages: IGenericErrorMessage[] = [];
    
    if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
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