import { NOT_FOUND, UNAUTHORIZED } from "http-status";
import ApiError from "../../../errors/apiErrors";
import { User } from "../users/user.model";
import { ILoginUser } from "./auth.interface"
import jwt, { Secret } from 'jsonwebtoken'
import config from "../../../config";
import { jwtHelpers } from "../../../helper/jwtHelpers";

const loginUser = async (payload: ILoginUser) => {
    const { id, password } = payload;

    const user = new User();
    const isUserExist = await user.isUserExist(id)
    
    if (!isUserExist) {
        throw new ApiError(NOT_FOUND, "User does not exist");
    }

    // if the password does not matched to each other
    if (isUserExist.password && !user.isPasswordMatched(password, isUserExist?.password)) {
        throw new ApiError(UNAUTHORIZED, 'Password is incorrect');
    };

    // create jwt token (access token and refresh token );
    const accessToken = jwtHelpers.createToken({id:isUserExist?.id, role: isUserExist?.role}, config.jwt.secrete, {expiresIn: config.jwt.refresh_secrete})
    
   

    return {
        isUserExist
    }
}

export const AuthService = {
    loginUser, 
    
}