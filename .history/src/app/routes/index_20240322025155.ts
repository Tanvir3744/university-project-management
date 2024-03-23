import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AcademicSemesterRoutes } from "../modules/academic-semester/academic-semester.route";
import { AcademicFacultyRoutes } from "../modules/academic-faculty/acadmic-faculty.route";
import { AcademicDepartmentRoutes } from "../modules/academic-Department/academicDepartment.route";
import { StudentRoute } from "../modules/student/student.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { ManagementDepartment } from "../modules/managementDepartment/managementDepartment.models";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/academic-semesters",
        route: AcademicSemesterRoutes,
    }, 
    {
        path: "/academic-faculty",
        route: AcademicFacultyRoutes,
    }, 
    {
        path: '/academic-department',
        route: AcademicDepartmentRoutes, 
    }, {
        path: "/students", 
        route: StudentRoute
    }, 
    {
        path: '/admins', 
        route: AdminRoutes
    },
    {
        path: "/manage-departments", 
        route: ManagementDepartment
    }, 
    {
        
    }
]

moduleRoutes.forEach((routeElem) => router.use(routeElem.path, routeElem.route));

// expected output through this method ***********
/* router.use('/users', UserRoutes);
router.use("/academic-semesters", AcademicSemesterRoutes); */

export default router;