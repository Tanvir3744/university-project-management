import { IAcademicSemester } from "../app/modules/academic-semester/academic-semester.interface";
import { User } from "../app/modules/users/user.model"

export const findLastStudentId = async() => {
    const lastUser =await User.findOne({role: "student"}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return lastUser?.id ? lastUser.id.substring(4) : undefined;
}

export const generateStudentId = async (academicSemester:IAcademicSemester | null) => {
    const currentUserId = await findLastStudentId() || String(0).padStart(5, '0');

    let incrementedId = parseInt(currentUserId + 1).toString().padStart(5, '0'); 
    incrementedId = `S${academicSemester.year.substring(2)}${academicSemester.code}${incrementedId}`;

    return incrementedId;
}



//creating faculty id; 
export const findLastFacultyId = async () => {
    const lastFaculty = await User.findOne({role: "faculty"}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return lastFaculty?.id ? lastFaculty.id.substring(4) : undefined;
}

export const generateFacultyId = async () => {
    const currentFacultyId = await findLastFacultyId() || String(0).padStart(5, "0");
    let incrementId = parseInt(currentFacultyId + 1).toString().padStart(5, '0');
    incrementId = `F${incrementId}`;
   /*  console.log(incrementId) */
    return incrementId;
}