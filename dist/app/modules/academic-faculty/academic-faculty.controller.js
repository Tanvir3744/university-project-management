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
exports.AcademicFacultyController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const academic_faculty_services_1 = require("./academic-faculty.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationFields_1 = require("../../../constants/paginationFields");
const createFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFacultiesData = __rest(req.body, []);
    const result = yield academic_faculty_services_1.AcademicFacultyServices.createFaculties(academicFacultiesData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculty has been created",
        data: result,
    });
    next();
}));
const getSingleFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academic_faculty_services_1.AcademicFacultyServices.getSingleFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculty successfully retrived",
        data: result,
    });
    next();
}));
const getAllFaculties = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const filters = (0, pick_1.default)(req.query, ["title", 'searchTerm']);
    const result = yield academic_faculty_services_1.AcademicFacultyServices.getAllFaculty(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "all faculties has been retrived successfully!",
        data: result.data,
        meta: result.meta
    });
    next();
}));
// update academic Faculties
const updateAcademicFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateId = req.params.id;
    const updatableData = req.body;
    const result = yield academic_faculty_services_1.AcademicFacultyServices.academicFacultiesUpdate(updateId, updatableData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result
    });
}));
//delete academic Faculty from database
const deleteAcademicFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academic_faculty_services_1.AcademicFacultyServices.deleteAcademicFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic faculty deleted successfully',
        data: result,
    });
}));
exports.AcademicFacultyController = {
    createFaculty,
    getSingleFaculty,
    getAllFaculties,
    updateAcademicFaculties,
    deleteAcademicFaculties
};
