import { USER_MESSAGES } from '../constants/messages.js'
import usersService from '../services/users.services.js'
export const registerController = async (req, res, next) => {
  const result = await usersService.register(req.body)
  return res.json({ message: USER_MESSAGES.REGISTER_SUCCESS, result })
}

export const loginController = async (req, res) => {
  const user = req.user
  const user_id = user._id
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    result
  })
}
