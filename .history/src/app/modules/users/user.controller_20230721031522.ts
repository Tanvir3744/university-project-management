import { Request, Response } from 'express'
import { UserService } from './user_service'
import catchAsync from '../../../shared/catchAsync'

const createUser = catchAsync(async (req: Request, res: Response) => {
  // grab users data from server
  const { user } = req.body
  const result = await UserService.createUser(user)
  console.log(result)
  res.status(200).json({
    status: 'Success',
    message: 'Successfully User has been created',
    data: result,
  })
})

export const UserController = {
  createUser,
}
