import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";


const loginController = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body, res.send);
});


export const AuthLoginController = {
    loginController
}