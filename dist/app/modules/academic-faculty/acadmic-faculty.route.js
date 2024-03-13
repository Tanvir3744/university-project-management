"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academic_faculty_controller_1 = require("./academic-faculty.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academic_faculty_validation_1 = require("./academic-faculty.validation");
//import router from express router function ;
const router = express_1.default.Router();
router.post('/create-academic-faculty', (0, validateRequest_1.default)(academic_faculty_validation_1.AcademicFacultyValidation.academicFacultyZodSchema), academic_faculty_controller_1.AcademicFacultyController.createFaculty);
router.get('/:id', academic_faculty_controller_1.AcademicFacultyController.getSingleFaculty);
router.patch("/:id", (0, validateRequest_1.default)(academic_faculty_validation_1.AcademicFacultyValidation.updateAcademicFacultyZodSchema), academic_faculty_controller_1.AcademicFacultyController.updateAcademicFaculties);
router.get('/', academic_faculty_controller_1.AcademicFacultyController.getAllFaculties);
router.delete("/:id", academic_faculty_controller_1.AcademicFacultyController.deleteAcademicFaculties);
exports.AcademicFacultyRoutes = router;
