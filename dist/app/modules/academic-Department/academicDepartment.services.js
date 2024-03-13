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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentServices = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const academicDepartment_constants_1 = require("./academicDepartment.constants");
const academicDepartment_models_1 = require("./academicDepartment.models");
const createAcademicDepartment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_models_1.AcademicDepartmentModels.create(payload);
    return result;
});
const getSingleDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_models_1.AcademicDepartmentModels.findById(id);
    return result;
});
const getAllDepartments = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditionForFilterAndSearch = [];
    //for search condition only...
    if (searchTerm) {
        andConditionForFilterAndSearch.push({
            $or: academicDepartment_constants_1.academicDepartmentFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    } // closing if
    // for exact match filtering...
    if (Object.keys(filtersData).length) {
        andConditionForFilterAndSearch.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    //for pagination and sorting data accroding to queries of users
    const { limit = 10, page = 1, skip, sortBy, sortOrder } = paginationHelper_1.pagintationHelpers.calculatePagination(paginationOptions);
    //for sorting and sortby
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andConditionForFilterAndSearch.length > 0 ? { $and: andConditionForFilterAndSearch } : {};
    const result = yield academicDepartment_models_1.AcademicDepartmentModels.find(whereCondition).populate("academicFaculty").sort(sortCondition).limit(limit).skip(skip);
    const total = yield academicDepartment_models_1.AcademicDepartmentModels.countDocuments();
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result,
    };
});
const updateDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_models_1.AcademicDepartmentModels.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const deleteDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_models_1.AcademicDepartmentModels.findByIdAndDelete(id);
    return result;
});
exports.AcademicDepartmentServices = {
    createAcademicDepartment,
    getSingleDepartment,
    getAllDepartments,
    updateDepartment,
    deleteDepartment
};
