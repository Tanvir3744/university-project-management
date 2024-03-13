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
exports.StudentService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const student_model_1 = require("./student.model");
const student_constants_1 = require("./student.constants");
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const getAllStudentService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //logic and conditions for implement search functionality
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const searchConditionWithAnd = [];
    if (searchTerm) {
        searchConditionWithAnd.push({
            $or: student_constants_1.studentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // filter data using this funciton
    if (Object.keys(filtersData).length) {
        {
            searchConditionWithAnd.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                })),
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
    const result = yield student_model_1.Student.find(whereCondition)
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('academicDepartment')
        .sort()
        .skip(skip)
        .limit(limit);
    const total = yield student_model_1.Student.countDocuments(searchConditionWithAnd);
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
const getSingleStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('academicDepartment');
    return result;
});
//update data of academic-semester
const updateStudentService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check whether a student is exist or not 
    const isExist = student_model_1.Student.findOne({ id });
    if (!isExist) {
        throw new apiErrors_1.default(http_status_1.default.NOT_FOUND, 'Student is not found');
    }
    const { guardian, localGuardian, name } = payload, studentData = __rest(payload, ["guardian", "localGuardian", "name"]);
    // copy student data
    const updatedStudentData = Object.assign({}, studentData);
    // convert student data into an array and make specific updates on them 
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`; //name.firstName | name.lastName --> output
            updatedStudentData[nameKey] = name[key];
        });
    }
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach(key => {
            const guardiankey = `name.${key}`; //name.firstName | name.lastName --> output
            updatedStudentData[guardiankey] = guardian[key];
        });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach(key => {
            const localGuardiankey = `name.${key}`; //name.firstName | name.lastName --> output
            updatedStudentData[localGuardiankey] = localGuardian[key];
        });
    }
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
});
const deleteStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findByIdAndDelete(id);
    return result;
});
exports.StudentService = {
    getAllStudentService,
    getSingleStudentService,
    updateStudentService,
    deleteStudentService,
};
