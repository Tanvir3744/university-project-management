import{Request, Response, NextFunction} from 'express';
import { AnyZodObject } from "zod";
const validateRequest = (schema:AnyZodObject) =>async (req:Request, res:Response, next:NextFunction ) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies
        })
    } catch (err) {
        next(err)
    }
}

export default validateRequest;