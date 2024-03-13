"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const academic_semester_route_1 = require("../modules/academic-semester/academic-semester.route");
const acadmic_faculty_route_1 = require("../modules/academic-faculty/acadmic-faculty.route");
const academicDepartment_route_1 = require("../modules/academic-Department/academicDepartment.route");
const student_route_1 = require("../modules/student/student.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes
    },
    {
        path: "/academic-semesters",
        route: academic_semester_route_1.AcademicSemesterRoutes,
    },
    {
        path: "/academic-faculty",
        route: acadmic_faculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.AcademicDepartmentRoutes,
    }, {
        path: "/students",
        route: student_route_1.StudentRoute
    }
];
moduleRoutes.forEach((routeElem) => router.use(routeElem.path, routeElem.route));
// expected output through this method ***********
/* router.use('/users', UserRoutes);
router.use("/academic-semesters", AcademicSemesterRoutes); */
exports.default = router;
