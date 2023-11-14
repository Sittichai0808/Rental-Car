import { USER_MESSAGES } from '../constants/messages.js'
import usersService from '../services/users.services.js'
import otpGenerator from 'otp-generator'
import { transporter, MailGenerator } from '../utils/nodemailerConfig.js'
import { config } from 'dotenv'
import { HTTP_STATUS } from '../constants/httpStatus.js'
config()
export const registerController = async (req, res, next) => {
  const result = await usersService.register(req.body)

  return res.json({
    message: USER_MESSAGES.REGISTER_SUCCESS,
    access_token: result.access_token.toString(),
    result: result.user
  })
}

export const loginController = async (req, res) => {
  const result = await usersService.login(req.user)

  return res.json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    access_token: result.access_token.toString(),
    result: result.rest,
    role: result.role
  })
}

export const googleController = async (req, res, next) => {
  console.log(req.body)
  const result = await usersService.google(req.body)

  return res.json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    access_token: result.access_token.toString(),
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
export const uploadImagesUser = async (req, res, next) => {
  const user_id = req.params.userId
  const result = await usersService.uploadImagesUser(user_id, req?.files)
  return res.json({
    message: USER_MESSAGES.UPLOAD_IMAGE_SUCCESS,
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

export const registerMailController = async (req, res, next) => {
  const { name, email, text, subject } = req.body

  // body of the email
  const bodyEmail = {
    body: {
      name: name,
      intro: text || "Welcome to Daily Tuition! We're very excited to have you on board.",
      outro: "Need help, or have questions? Just reply to this email, we'd love to help."
    }
  }

  const emailBody = MailGenerator.generate(bodyEmail)

  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: subject || 'Signup Successful',
    html: emailBody
  }

  // send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({ msg: 'You should receive an email from us.' })
    })
    .catch((error) => res.status(500).send({ error }))
}

export const getUserByEmailController = async (req, res, next) => {
  const result = await usersService.getUserByEmail(req.body)

  return res.json({
    message: USER_MESSAGES.GET_USERS_SUCCESS,
    result: result
  })
}

export const getUsers = async (req, res, next) => {
  try {
    const result = await usersService.getUsers()
    return res.status(HTTP_STATUS.OK).json({
      message: 'Get List Users Success',
      result
    })
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Could not get list users' })
  }
}

export const getDetailUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const result = await usersService.getDetailUser(userId)
    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' })
    } else {
      return res.status(HTTP_STATUS.OK).json({
        message: 'Get Detail User Success',
        result
      })
    }
  } catch (e) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' })
  }
}

export const getStaffs = async (req, res, next) => {
  try {
    const result = await usersService.getStaffs()
    return res.status(HTTP_STATUS.OK).json({
      message: 'Get List Staffs success',
      result
    })
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Could not get list staffs' })
  }
}
