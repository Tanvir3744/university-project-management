import { User } from "./user.model"
import { IUser } from "./users.interface"
import config from "../../../config/index"
import { generateStudentId } from "../../../utils/user.utils"
import ApiError from "../../../errors/apiErrors"
import { IStudent } from "../student/student.interface"
// create user service
const createStudent = async (student:IStudent, user: IUser): Promise <IUser | null> => {

    const academiSemester  = {
        year: "2023",
        code: "01",
        title: "Fall",
        startMonth: "may",
        endMonth: "january",
    }

    //generate auto incremental id ;
    const id = await generateStudentId(academiSemester); 

    // set user id; 
    user.id = id;


    // set default pasword
    if (!user.password) {
        user.password = config.default_pass as string;
    }

    // create user into database;
    const createdUser = await User.create(user);

    // if the user throw eny error (validation)
    if (!createdUser) {
        throw new ApiError(400 , "failed to create user");
    }

    return createdUser;
}

export const UserService = {
    createUser,
}