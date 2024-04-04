import { NOT_FOUND, UNAUTHORIZED } from "http-status";
import ApiError from "../../../errors/apiErrors";
import { User } from "../users/user.model";
import { ILoginUser } from "./auth.interface"
import bcrypt from 'bcrypt'


const loginUser = async (payload: ILoginUser) => {
    const { id, password } = payload;
    
    // if the user is exist or not ;
    const isUserExist = await User.findOne({ id }, { id: 1, password: 1, needsPasswordChange: 1 });
    if (!isUserExist) {
        throw new ApiError(NOT_FOUND, "User does not exist");
    }

    // match password (plain, hash);
    const isPasswordMatched = bcrypt.compare(password, isUserExist?.password);

    // if the password does not matched to each other
    if (!isPasswordMatched) {
        throw new ApiError(UNAUTHORIZED, 'Password is incorrect');
    }

    return {
        isUserExist,
        password
    }
}

export const AuthService = {
    loginUser
}