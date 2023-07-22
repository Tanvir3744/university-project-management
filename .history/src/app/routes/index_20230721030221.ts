import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AcademicSemesterRoutes } from "../modules/academic-semester/academic-semester.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/academic-semesters",
        route: AcademicSemesterRoutes,
    }
]

moduleRoutes.forEach((routeElem) => router.use(routeElem.path, routeElem.route));

// expected output through this method
/* router.use('/users', UserRoutes);
router.use("/academic-semesters", AcademicSemesterRoutes); */

export default router;