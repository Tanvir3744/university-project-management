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
exports.AcademicSemesterService = void 0;
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const academic_constants_1 = require("./academic-constants");
const academic_semester_models_1 = require("./academic-semester.models");
const http_status_1 = __importDefault(require("http-status"));
const createAcademicSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // semester title and code matching validation
    if (academic_constants_1.academicSemesterAndCodeMapper[payload.title] !== payload.code) {
        throw new apiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Semester Title and code did not matched each other');
    }
    const result = yield academic_semester_models_1.AcademicSemester.create(payload);
    return result;
});
const getAllSemestersService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //logic and conditions for implement search functionality
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const searchConditionWithAnd = [];
    if (searchTerm) {
        searchConditionWithAnd.push({
            $or: academic_constants_1.searchAbleFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    // filter data using this funciton
    if (Object.keys(filtersData).length) {
        {
            searchConditionWithAnd.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value
                }))
            });
        }
    }
    // declare type for pagination options
    const { page = 1, limit = 10, skip, sortBy, sortOrder } = paginationHelper_1.pagintationHelpers.calculatePagination(paginationOptions);
    // sortconditions for dynamic sorting
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    //if got any rejection without filtering and sorting api and this is holding all logics here 
    const whereCondition = searchConditionWithAnd.length > 0 ? { $and: searchConditionWithAnd } : {};
    const result = yield academic_semester_models_1.AcademicSemester.find(whereCondition)
        .sort()
        .skip(skip)
        .limit(limit);
    const total = yield academic_semester_models_1.AcademicSemester.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single semester service...
const getSingleSemesterService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_semester_models_1.AcademicSemester.findById(id);
    return result;
});
//update data of academic-semester
const updateAcademicSemesterService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // validating code and title if they match each other..
    if (payload.title && payload.code && academic_constants_1.academicSemesterAndCodeMapper[payload.title] !== payload.code) {
        throw new apiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Semester Title and code did not matched each other');
    }
    const result = yield academic_semester_models_1.AcademicSemester.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const deleteSemesterService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_semester_models_1.AcademicSemester.findByIdAndDelete(id);
    return result;
});
exports.AcademicSemesterService = {
    createAcademicSemester,
    getAllSemestersService,
    getSingleSemesterService,
    updateAcademicSemesterService,
    deleteSemesterService,
};
