import jwt, { Secret } from "jsonwebtoken"

const createToken = (payload:Record<string, unknown>, secret:Secret, options : Record<string, unknown>) => {
    return jwt.sign(payload, secret, options);
}