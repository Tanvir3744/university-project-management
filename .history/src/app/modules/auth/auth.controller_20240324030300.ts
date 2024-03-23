import catchAsync from "../../../shared/catchAsync";


const loginController = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
});


export const AuthLoginController = {
    loginController;
}