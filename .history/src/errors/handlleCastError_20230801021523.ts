import mongoose from "mongoose";
const handleCastError = (err: mongoose.Error.CastError) => {

    const statusCode = 400;
    return {
        statusCode, 
        message: 'Cast Error (this is appearing for wrong id)',
        errorMessage: err,
    }
}