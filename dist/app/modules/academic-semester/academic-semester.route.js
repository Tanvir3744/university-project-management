"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicValidation_1 = require("./academicValidation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academic_semester_controller_1 = require("./academic-semester.controller");
const router = express_1.default.Router();
// create semester using this route
router.post('/create-semester', (0, validateRequest_1.default)(academicValidation_1.academicSemesterValidation.createAcademicSemesterZodSchema), academic_semester_controller_1.AcademicSemesterController.createAcademicSemester);
// to get single semester 
router.get('/:id', academic_semester_controller_1.AcademicSemesterController.getSingleSemester);
// to update desired data use this route...
router.patch('/:id', (0, validateRequest_1.default)(academicValidation_1.academicSemesterValidation.updateAcademicSemesterZodSchema), academic_semester_controller_1.AcademicSemesterController.updateAcademicSemester);
// to get all semesters from the Semester_collection of database
router.get('/', academic_semester_controller_1.AcademicSemesterController.getAllSemesters);
// to delete semester
router.delete("/:id", academic_semester_controller_1.AcademicSemesterController.deleteSemester);
exports.AcademicSemesterRoutes = router;
