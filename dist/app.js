"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
// using middleware here
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//application main routes
app.use("/api/v1", routes_1.default);
// testing api 
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// handle not found 
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Ooops....!!! Not Found !",
        errorMessages: [{
                path: req.originalUrl,
                message: "API not found !",
            }]
    }),
        next();
});
//global error handler
app.use(globalErrorHandler_1.default);
/* testing generate student id */
/*
const testId = async () => {
  const testedId = await generateFacultyId();
  console.log(testedId)
}
testId(); */
exports.default = app;
