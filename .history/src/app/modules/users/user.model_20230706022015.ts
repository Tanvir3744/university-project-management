import { Schema, model } from 'mongoose'
import { IUser } from './users.interface'

export const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
    },
    role: {
        type: String, 
        required:true, 
    }, 
    password: {
        type: String, 
        required: true, 
    } 
},{ timestamps: true})
