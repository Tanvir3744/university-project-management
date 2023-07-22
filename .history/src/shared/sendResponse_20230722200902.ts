const sendResponse =<T> (res, data: {
    statusCode: number,
    success: boolean,
    message?: string, 
    data: T, 
}) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        sucess: data.success,
        message: data.message,
        data: data.data,
    })
}

export default sendResponse;