const handleCastError = (err) => {
    const statusCode = 400;
    return {
        statusCode, 
        message: 'Cast Error (this is appearing for wrong id)',
        errorMessage: err,
    }
}