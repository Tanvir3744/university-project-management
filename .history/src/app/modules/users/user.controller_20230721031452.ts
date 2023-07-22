import { Request } from 'express'
import { UserService } from './user_service'

const createUser= async (req:Request, res:Response) => {
  
    // grab users data from server
    const { user } = req.body
    const result = await UserService.createUser(user)
    console.log(result)
    res.status(200).json({
      status: 'Success',
      message: 'Successfully User has been created',
      data: result,
    })
  
}

export const UserController = {
  createUser,
}
