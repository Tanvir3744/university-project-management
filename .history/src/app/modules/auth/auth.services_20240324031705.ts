import { User } from "../users/user.model";
import { ILoginUser } from "./auth.interface"



const loginUser = async (payload: ILoginUser) => {
    const { id, password } = payload;
    
    // if the user is exist or not ;
    const isUserExist = await User.findOne({id}, {id:1,password: 1}, needsPasswordChange)
    return {

    }
}

export const AuthService = {
    loginUser
}