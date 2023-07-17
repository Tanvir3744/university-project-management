import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (err, req: Request, res:Response, next:NextFunction) => {
    res.status(400).json({ err: err });


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