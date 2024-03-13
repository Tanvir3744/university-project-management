"use strict";
// defines a template for sending response through
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: (data === null || data === void 0 ? void 0 : data.data) || null,
        meta: data.meta,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
