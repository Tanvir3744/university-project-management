"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errors = [
        { path: err.path, message: 'Invalid Object Id' },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error (this is appearing for wrong id)',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
