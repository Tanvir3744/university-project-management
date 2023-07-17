import { User } from "./user.model"
import { IUser } from "./users.interface"

// create user service
const createUser = async (user: IUser): Promise<IUser | null>  => {
    const createdUser = User.create(user);

    // if the user throw eny error
    if (!createdUser) {
        throw new Error("failed to create user");
    }

    return createdUser;
}

export default {
    createUser,
}