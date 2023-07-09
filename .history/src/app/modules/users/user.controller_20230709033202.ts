import { Request, Response } from 'express'
import user_service from './user_service'

export const createUser = async (req: Request, res: Response) => {
  try {
    // grab data from server
    const {user} = req.body
    const result = await user_service.createUser(user)
    res.status(200).json({
      status: 'Success',
      message: 'Successfully User has been created',
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'failed to create user',
    })
  }
}
