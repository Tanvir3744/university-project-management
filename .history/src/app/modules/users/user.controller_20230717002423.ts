import {  RequestHandler } from 'express'
import user_service from './user_service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // grab data from server
    const { user } = req.body
    const result = await user_service.createUser(user)
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

export default {
  createUser,
}
