import { User } from "./user.model"
import { IUser } from "./users.interface"

// create user service
const createUser = async (user: IUser): Promise<IUser | null>  => {
    const createUser = User.create(user);
    return createUser;
}
