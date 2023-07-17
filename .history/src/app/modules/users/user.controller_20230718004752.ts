import {  RequestHandler } from 'express'
/* import { UserService } from './user_service' */
import { z } from "zod";

const createUser: RequestHandler = async (req, res, next) => {
  try {

    // validation with zod
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: "role is required"
        }), 
        password: z.string().optional()
      })
    });

    await createUserZodSchema.parseAsync(req);

    // grab data from server
    const { user } = req.body
    const result = await UserService.createUser(user)
    console.log(result)
    res.status(200).json({
      status: 'Success',
      message: 'Successfully User has been created',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}
