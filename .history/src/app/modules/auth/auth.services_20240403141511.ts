import { NOT_FOUND, UNAUTHORIZED } from "http-status";
import ApiError from "../../../errors/apiErrors";
import { User } from "../users/user.model";
import { ILoginUser } from "./auth.interface"
import bcrypt from 'bcrypt'


const loginUser = async (payload: ILoginUser) => {
    const { id, password } = payload;

    const user = new User();
    const isUserExist = await user.isUserExist(id)
    
    if (!isUserExist) {
        throw new ApiError(NOT_FOUND, "User does not exist");
    }

    // if the password does not matched to each other
    if (!user.isPasswordMatched(password, isUserExist?.password)) {
        throw new ApiError(UNAUTHORIZED, 'Password is incorrect');
    };

    // create jwt token 

    return {}
}

export const AuthService = {
    loginUser
}