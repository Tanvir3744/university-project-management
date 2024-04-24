import jwt, { Secret } from "jsonwebtoken"

const createToken = (payload:Record<string, unknown>, secret:Secret, options) => {
    return jwt.sign(payload, secret, options);
}