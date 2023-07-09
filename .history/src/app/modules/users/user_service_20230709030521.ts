import { User } from "./user.model"
import { IUser } from "./users.interface"
import config from "../../../config/index"
import { generateUserId } from "../../../utils/user.utils"
// create user service
const createUser = async (user: IUser): Promise<IUser | null> => {

    //generate auto incremental id ;
    const id = generateUserId();
    console.log(id)

    // set user id; 
    user.id = id;

    // set default pasword
    if (!user.password) {
        user.password = config.default_pass as string;
    }


    // create user into database;
    const createdUser =await User.create(user);

    // if the user throw eny error (validation)
    if (!createdUser) {
        throw new Error("failed to create user");
    }

    return createdUser;
}

export default {
    createUser,
}