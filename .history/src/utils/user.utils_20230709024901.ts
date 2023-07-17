import { User } from "../app/modules/users/user.model"

export const findLastUserId = async() => {
    const lastUser = User.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return lastUser?.id
}