"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controllers_1 = require("./academicDepartment.controllers");
const router = express_1.default.Router();
router.post('/create-department', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentZodSchema), academicDepartment_controllers_1.AcademicDepartmentControllers.createAcademicDepartment);
router.get('/:id', academicDepartment_controllers_1.AcademicDepartmentControllers.getSingleDepartment);
router.patch('/:id', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), academicDepartment_controllers_1.AcademicDepartmentControllers.updateDepartment);
router.get('/', academicDepartment_controllers_1.AcademicDepartmentControllers.getAllDepartments);
router.delete("/:id", academicDepartment_controllers_1.AcademicDepartmentControllers.deleteDepartment);
exports.AcademicDepartmentRoutes = router;
