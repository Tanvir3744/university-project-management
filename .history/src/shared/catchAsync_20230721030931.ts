import { Request, Response, NextFunction } from "express";

const catchAsync = (fn) => {
    return async (req:Request , res:Response, next: NextFunction) => {
        try {
            return fn(req, res, next);
        } catch (err) {
            next(err)
        }
    }
}

export default catchAsync;