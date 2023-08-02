const handleCastError = (err) => {
    const statusCode = 400;
    return {
        statusCode, 
        message: 'Cast Error',
        errorMessage: err,
    }
}