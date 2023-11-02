import express from 'express'
import { registerValidator, loginValidator, accessTokenValidator } from '../middlewares/users.middlewares.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import uploadCloud from '../utils/cloudinary.config.js'
import {
  registerController,
  loginController,
  googleController,
  getUserController,
  updateUserController,
  generateOTPController,
  verifyOTPController,
  resetPasswordController,
  registerMailController,
  getUserByEmailController,
  uploadImagesUser
} from '../controllers/users.controllers.js'
const usersRoutes = express.Router()

/**
 * Description: Register a user
 * Path: /register
 * Method: POST
 * Body:{ username: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
usersRoutes.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Login a user
 * Path: /login
 * Method: POST
 * Body:{ username: string, email: string, password: string}
 */
usersRoutes.post(
  '/login',
  loginValidator,
  uploadCloud.fields([{ name: 'profilePicture', maxCount: 10 }]),
  wrapRequestHandler(loginController)
)

/**
 * Description: OAuth Google Account
 * Path: /google
 * Method: POST
 * Body:{ username: string, email: string, password: string,profilePicture: string}
 */
usersRoutes.post('/google', wrapRequestHandler(googleController))

/**
 * Description: Get User
 * Path: /get-user
 * Method: GET
 * Headers: {Authorization: Bearer <access_token>}
 */
usersRoutes.get('/get-user', accessTokenValidator, wrapRequestHandler(getUserController))

/**
 * Description: Get User
 * Path: /get-user
 * Method: GET
 * body: {email: string}
 */
usersRoutes.post('/get-user-by-email', wrapRequestHandler(getUserByEmailController))

/**
 * Description: Update User
 * Path: /update-user
 * Method: POST
 * Body:{ username: string, email: string, password: string,profilePicture: string,...}
 */
usersRoutes.put('/update-user/:userId', accessTokenValidator, wrapRequestHandler(updateUserController))
usersRoutes.put('/uploadimage/:userId', uploadCloud.array('profilePicture', 10), wrapRequestHandler(uploadImagesUser))

/**
 * Description: Generate OTP
 * Path: /generate-otp
 * Method: GET
 * Body: {email: String}
 */
usersRoutes.get('/generate-otp', wrapRequestHandler(generateOTPController))

/**
 * Description: Verify OTP
 * Path: /verify-otp
 * Method: GET
 */
usersRoutes.get('/verify-otp/:code', wrapRequestHandler(verifyOTPController))

/**
 * Description: Reset Password
 * Path: /reset-password
 * Method: PUT
 */
usersRoutes.put('/reset-password', wrapRequestHandler(resetPasswordController))

/**
 * Description: Register Mail
 * Path: /register-mail
 * Method: POST
 * Body: {email: String,name: string, text: String, subject: String}
 */

/**
 * Description: Register Mail
 * Path: /register-mail
 * Method: POST
 * Body: {email: String,name: string, text: String, subject: String}
 */
usersRoutes.post('/register-mail', wrapRequestHandler(registerMailController))

export default usersRoutes
