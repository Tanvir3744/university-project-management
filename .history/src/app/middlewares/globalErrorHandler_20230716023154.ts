import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (err, req: Request, res:Response, next:NextFunction) => {
    res.status(400).json({ err: err });
    next()
}

export default globalErrorHandler;