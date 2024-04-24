import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.services";


const loginController = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);

    // set refresh token before into cookie
    res.cookie("refreshToken", result.refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User has logged in successfully",
        data: result,
    })
});


export const AuthLoginController = {
    loginController
}