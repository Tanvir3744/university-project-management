import jwt from "jsonwebtoken"

const createToken = (payload:Record<string, unknown>, secret:string, options : Record<string, unknown>): string => {
    return jwt.sign(payload, secret, options);
}

export const jwtHelpers = {
    createToken
}

/* 
dummy code before making it reusable
====================================
 const refreshToken = jwt.sign({
        id: isUserExist?.id,
        role: isUserExist?.role,
    },config.jwt.refresh_secrete as Secret ,{expiresIn: config.jwt.refresh_expires_in});

*/
