import express from 'express'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator } from '../middlewares/users.middlewares.js'
import {
  cancelBooking,
  createBooking,
  getBookedTimeSlots,
  getHistoryBooking,
  getListBooking
} from '../controllers/bookings.controllers.js'

const bookingRoutes = express.Router()

bookingRoutes.post('/:carId', accessTokenValidator, wrapRequestHandler(createBooking))
bookingRoutes.get('/historyBooking', accessTokenValidator, wrapRequestHandler(getHistoryBooking))
bookingRoutes.get('/', wrapRequestHandler(getListBooking))
bookingRoutes.get('/:carId', wrapRequestHandler(getBookedTimeSlots))
bookingRoutes.delete('/:bookingId', accessTokenValidator, wrapRequestHandler(cancelBooking))
export default bookingRoutes
