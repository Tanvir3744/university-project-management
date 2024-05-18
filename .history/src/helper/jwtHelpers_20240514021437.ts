import jwt, { Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime:string
): string => {
 return jwt.sign(payload, secret, {expiresIn:expireTime })
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};


export const jwtHelpers = {
  createToken,
  verifyToken
}



/* 
dummy code before making it reusable
====================================
 const refreshToken = jwt.sign({
        id: isUserExist?.id,
        role: isUserExist?.role,
    },config.jwt.refresh_secrete as Secret ,{expiresIn: config.jwt.refresh_expires_in});

*/
