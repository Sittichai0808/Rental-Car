import { USER_MESSAGES } from '../constants/messages.js'
import usersService from '../services/users.services.js'
import otpGenerator from 'otp-generator'

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
  console.log(result.access_token.toString())
  return res.cookie('access_token', result.access_token.toString(), { httpOnly: true, expires: expiryDate }).json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    result: result.rest
  })
}

export const getUserController = async (req, res, next) => {
  const result = await usersService.getUser(req.decoded_authorization)
  return res.json({
    message: USER_MESSAGES.GET_PROFILE_SUCCESS,
    result: result
  })
}

export const updateUserController = async (req, res, next) => {
  const user_id = req.params.userId
  const result = await usersService.updateUser(user_id, req.body)
  return res.json({
    message: USER_MESSAGES.UPDATE_PROFILE_SUCCESS,
    result: result
  })
}

export const generateOTPController = async (req, res, next) => {
  const email = req.body.email
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  })

  return res.json({ code: req.app.locals.OTP, email })
}

export const verifyOTPController = async (req, res, next) => {
  const { code } = req.params
  const email = req.body.email
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null
    req.app.locals.resetSession = true
    return res.json({
      message: 'Verify Successsfully!',
      email
    })
  }

  return res.json({ message: 'Invalid OTP', email })
}

export const resetPasswordController = async (req, res, next) => {
  if (!req.app.locals.resetSession) {
    return res.json({ message: 'Session expired!' })
  }
  const result = await usersService.resetPassword(req.body)
  return res.json({
    message: USER_MESSAGES.RESET_PASSWORD_SUCCESS,
    result: result
  })
}
