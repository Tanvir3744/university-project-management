import jwt, { Secret } from "jsonwebtoken"

const createToken = (payload, secret:Secret, options) => {
    return jwt.sign(payload, secret, options);
}