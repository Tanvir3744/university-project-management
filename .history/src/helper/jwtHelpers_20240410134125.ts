import jwt, { Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime:string
): string => {
 return jwt.sign(payload, secret, {expiresIn:expireTime })
}

export const jwtHelpers = {
  createToken,
}

/* 
dummy code before making it reusable
====================================
 const refreshToken = jwt.sign({
        id: isUserExist?.id,
        role: isUserExist?.role,
    },config.jwt.refresh_secrete as Secret ,{expiresIn: config.jwt.refresh_expires_in});

*/
