import { Schema, model } from 'mongoose'
import { IUser, IUserMethods, UserModel } from './users.interface'
import bcrypt from "bcrypt";
import config from '../../../config';

export const userSchema = new Schema<IUser,Record<string,unknown>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0
    },
    needsPasswordChange: {
      type: Boolean, 
      default: true, 
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// is user exist in the user model 
userSchema.statics.isUserExist = async function (
  id: string
): Promise<IUser | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

// is password matched to others
userSchema.methods.isPasswordMatched = async function (givenPassword: string, savedPassword: string) {
  return await bcrypt.compare(givenPassword, savedPassword);
}


// hash password with prehook;
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round));
  next();
})

export const User = model<IUser, UserModel>('User', userSchema)
