"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationFields_1 = require("../../../constants/paginationFields");
const student_services_1 = require("./student.services");
const student_constants_1 = require("./student.constants");
// const get all semesters
const getAllStudents = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // search functionality
    const filters = (0, pick_1.default)(req.query, student_constants_1.studentFilterableFields);
    // pagination functionality
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const result = yield student_services_1.StudentService.getAllStudentService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully academic semester has been retrived',
        data: result.data,
        meta: result.meta,
    });
    next();
}));
// get single semester
const getSingleStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterId = req.params.id;
    const result = yield student_services_1.StudentService.getSingleStudentService(semesterId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester retrived sucessfully!',
        data: result,
    });
    next();
}));
// update academic semester
const updateStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateId = req.params.id;
    const updateData = req.body;
    const result = yield student_services_1.StudentService.updateStudentService(updateId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters data updated sucessfully!',
        data: result,
    });
}));
const deleteStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteId = req.params.id;
    const result = yield student_services_1.StudentService.deleteStudentService(deleteId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters data deleted sucessfully!',
        data: result,
    });
}));
exports.StudentController = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
