import{Request, Response, NextFunction} from 'express';
import { AnyZodObject } from "zod";
const validateRequest = (schema:AnyZodObject) => (req:Request, res:Response, next:NextFunction ) => {
    try {
        
    } catch (err) {
        next(err)
    }
}

export default validateRequest;