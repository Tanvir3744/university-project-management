"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyModels = void 0;
const mongoose_1 = require("mongoose");
const academicFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    }
});
exports.AcademicFacultyModels = (0, mongoose_1.model)('AcademicFaculty', academicFacultySchema);
