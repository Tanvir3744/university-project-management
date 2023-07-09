import { User } from "../app/modules/users/user.model"

export const findLastUserId = async() => {
    const lastUser =await User.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return lastUser?.id;
}

export const generateUserId = async () => {
    const currentUserId = (await findLastUserId()) || String(0).padStart(5, '0');

    const incrementedId = currentUserId + 1; 
    return incrementedId;
}

console.log(generateUserId())