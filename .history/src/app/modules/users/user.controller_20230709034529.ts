import { Request, Response } from 'express'
import user_service from './user_service'

const createUser = async (req: Request, res: Response) => {
  try {
    // grab data from server
    const { user } =await  req.body
    const result = await user_service.createUser(user)
    console.log(result)
    res.status(200).json({
      status: 'Success',
      message: 'Successfully User has been created',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'failed to create user',
    })
  }
}

export default {
  createUser,
}
