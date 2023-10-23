import { createOrderPaymentController } from '../controllers/payment.controller'
import { wrapRequestHandler } from '../utils/handlers'

/**
 * Description: Register a user
 * Path: /register
 * Method: POST
 * Body:{ username: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
usersRoutes.post('/create_payment_url', wrapRequestHandler(createOrderPaymentController))
