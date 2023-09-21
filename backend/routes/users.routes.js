import express from 'express'
import { registerValidator, loginValidator } from '../middlewares/users.middlewares.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { registerController, loginController } from '../controllers/users.controllers.js'
const usersRoutes = express.Router()

/**
 * Description: Register a user
 * Path: /register
 * Method: POST
 * Body:{ name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
usersRoutes.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Login a user
 * Path: /login
 * Method: POST
 * Body:{ name: string, email: string, password: string}
 */
usersRoutes.post('/login', loginValidator, wrapRequestHandler(loginController))

export default usersRoutes
