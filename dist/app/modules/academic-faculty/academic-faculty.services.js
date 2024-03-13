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
exports.AcademicFacultyServices = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const academic_faculty_model_1 = require("./academic-faculty.model");
const academic_faculty_constants_1 = require("./academic-faculty.constants");
const createFaculties = (payload) => {
    const result = academic_faculty_model_1.AcademicFacultyModels.create(payload);
    return result;
};
const getSingleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_faculty_model_1.AcademicFacultyModels.findById(id);
    return result;
});
const getAllFaculty = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    //filtering and searching with keywords
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const searchAndfilterCondition = [];
    //search functionalities
    if (searchTerm) {
        searchAndfilterCondition.push({
            $or: academic_faculty_constants_1.academicFacultySearchableField.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    //filters needs $and to fullfill all the condition to extact match
    if (Object.keys(filtersData).length) {
        searchAndfilterCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    // these are for pagination and sort functionality...
    const { page = 1, limit = 10, sortBy, sortOrder, skip } = paginationHelper_1.pagintationHelpers.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = searchAndfilterCondition.length > 0 ? { $and: searchAndfilterCondition } : {};
    const result = yield academic_faculty_model_1.AcademicFacultyModels.find(whereCondition).sort(sortCondition).limit(limit).skip(skip);
    const total = yield academic_faculty_model_1.AcademicFacultyModels.countDocuments();
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result,
    };
});
// update academic faculties titles 
const academicFacultiesUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_faculty_model_1.AcademicFacultyModels.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
//delete academic faculty 
const deleteAcademicFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_faculty_model_1.AcademicFacultyModels.findByIdAndDelete(id);
    return result;
});
exports.AcademicFacultyServices = {
    createFaculties,
    getSingleFaculty,
    getAllFaculty,
    academicFacultiesUpdate,
    deleteAcademicFaculty
};
