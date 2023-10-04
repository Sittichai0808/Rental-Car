import { USER_MESSAGES } from '../constants/messages.js'
import usersService from '../services/users.services.js'
export const registerController = async (req, res, next) => {
  console.log(req)
  const result = await usersService.register(req.body)

  return res.json({ message: USER_MESSAGES.REGISTER_SUCCESS, result })
}

export const loginController = async (req, res) => {
  const result = await usersService.login(req.user)
  const expiryDate = new Date(Date.now() + 3600000) // 1 hour
  return res.cookie('access_token', result.access_token.toString(), { httpOnly: true, expires: expiryDate }).json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    access_token: result.access_token.toString(),
    result: result.rest
  })
}

export const googleController = async (req, res, next) => {
  console.log(req.body)
  const result = await usersService.google(req.body)
  const expiryDate = new Date(Date.now() + 3600000) // 1 hour
  return res.cookie('access_token', result.access_token.toString(), { httpOnly: true, expires: expiryDate }).json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    result: result.rest
  })
}

export const getUserController = async (req, res, next) => {
  console.log(req.cookies.access_token)
  const result = await usersService.getUser(req.decoded_authorization)
  return res.json({
    message: USER_MESSAGES.GET_PROFILE_SUCCESS,
    result: result
  })
}
