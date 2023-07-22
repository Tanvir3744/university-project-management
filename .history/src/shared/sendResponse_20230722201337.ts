import { Response } from "express";

type IApiResponse<T> = {
    statusCode: number,
    success: boolean,
    message?: string, 
    data: T, 
}

const sendResponse =<T> (res:Response, data: {
   
}) : void => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        sucess: data.success,
        message: data.message || null,
        data: data?.data || null,
    })
}

export default sendResponse;