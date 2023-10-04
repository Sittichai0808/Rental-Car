import express from 'express'
import { registerValidator, loginValidator, accessTokenValidator } from '../middlewares/users.middlewares.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import {
  registerController,
  loginController,
  googleController,
  getUserController
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
usersRoutes.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description: OAuth Google Account
 * Path: /google
 * Method: POST
 * Body:{ username: string, email: string, password: string,profilePicture: string}
 */
usersRoutes.post('/google', wrapRequestHandler(googleController))

/**
 * Description: get User
 * Path: /get-user
 * Method: GET
 * Headers: {Authorization: Bearer <access_token>}
 */
usersRoutes.get('/get-user', accessTokenValidator, wrapRequestHandler(getUserController))
export default usersRoutes
