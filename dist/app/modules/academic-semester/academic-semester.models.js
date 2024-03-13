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
exports.AcademicSemester = exports.academicSemesterSchema = void 0;
const mongoose_1 = require("mongoose");
const academic_constants_1 = require("./academic-constants");
const http_status_1 = __importDefault(require("http-status"));
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
exports.academicSemesterSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        enum: academic_constants_1.academicTitle,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academic_constants_1.academicCodes
    },
    startMonth: {
        type: String,
        required: true,
        enum: academic_constants_1.academicMonths
    },
    endMonth: {
        type: String,
        required: true,
        enum: academic_constants_1.academicMonths
    }
}, { timestamps: true });
//same year and same semester dupllication validation (pre-hook and post-hook);
exports.academicSemesterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.AcademicSemester.findOne({ title: this.title, year: this.year });
        console.log("this one is exst variable");
        if (isExist) {
            throw new apiErrors_1.default(http_status_1.default.CONFLICT, 'Academic Semester is already Exist');
        }
        next();
    });
});
exports.AcademicSemester = (0, mongoose_1.model)('AcademicSemester', exports.academicSemesterSchema);
