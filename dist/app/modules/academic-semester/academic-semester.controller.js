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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterController = void 0;
const academic_semester_services_1 = require("./academic-semester.services");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationFields_1 = require("../../../constants/paginationFields");
const createAcademicSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // grab data from server
    const academicSemesterData = __rest(req.body, []);
    const result = yield academic_semester_services_1.AcademicSemesterService.createAcademicSemester(academicSemesterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully academic semester has been created",
        data: result,
    });
    next();
}));
// const get all semesters
const getAllSemesters = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // search functionality 
    const filters = (0, pick_1.default)(req.query, ['searchTerm', 'title', 'code', 'year', 'startMonth', "endMonth"]);
    // pagination functionality
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const result = yield academic_semester_services_1.AcademicSemesterService.getAllSemestersService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully academic semester has been retrived",
        data: result.data,
        meta: result.meta,
    });
    next();
}));
// get single semester
const getSingleSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterId = req.params.id;
    const result = yield academic_semester_services_1.AcademicSemesterService.getSingleSemesterService(semesterId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Semester retrived sucessfully!",
        data: result,
    });
    next();
}));
// update academic semester
const updateAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateId = req.params.id;
    const updateData = req.body;
    const result = yield academic_semester_services_1.AcademicSemesterService.updateAcademicSemesterService(updateId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Semesters data updated sucessfully!",
        data: result,
    });
}));
const deleteSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteId = req.params.id;
    const result = yield academic_semester_services_1.AcademicSemesterService.deleteSemesterService(deleteId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Semesters data deleted sucessfully!",
        data: result,
    });
}));
exports.AcademicSemesterController = {
    createAcademicSemester,
    getAllSemesters,
    getSingleSemester,
    updateAcademicSemester,
    deleteSemester
};
