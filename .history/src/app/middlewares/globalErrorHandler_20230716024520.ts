import { config } from "../../config/index";
import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (err, req: Request, res:Response, next:NextFunction) => {
    res.status(400).json({ err: err });


    type IGenericErrorMessage = { 
        path: string, 
        message: string
    }

    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessages : IGenericErrorMessage[]= [];

    // making a pattern for generating errors for simplified messages...
    res.status().json({
        sucess: false, 
        message, 
        errorMessages,
        stack: config.env !== "production" ? err.stack : undefined;
    })
    next()
}

export default globalErrorHandler;