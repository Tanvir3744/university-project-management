import { User } from "./user.model"
import { IUser } from "./users.interface"
import config from "../../../config/index"
import { generateUserId } from "../../../utils/user.utils"
// create user service
const createUser = async (user: IUser): Promise<IUser | null> => {
    const id = generateUserId();
  
    user.id = id;
  
    if (!user.password) {
      user.password = config.default_pass as string;
    }
  
    try {
      const createdUser = await User.create(user);
  
      if (!createdUser) {
        throw new Error("Failed to create user");
      }
  
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

export default {
    createUser,
}