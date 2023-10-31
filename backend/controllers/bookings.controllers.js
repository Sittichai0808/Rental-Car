import bookingService from '../services/booking.services.js'
import { HTTP_STATUS } from '../constants/httpStatus.js'

export const createBooking = async (req, res) => {
  try {
    const { carId } = req.params
    const user_id = req.decoded_authorization.user_id
    const result = await bookingService.createBooking(user_id, carId, req.body)
    return res.status(HTTP_STATUS.OK).json({
      message: 'Booking created successfully',
      result
    })
  } catch (error) {
    console.log(error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Cannot Create Booking' })
  }
}

export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params
  try {
    const result = await bookingService.cancelBooking(bookingId)

    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Booking not found' })
    }
    return res.status(HTTP_STATUS.OK).json({ message: 'Cancelled booking' })
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' })
  }
}

export const getHistoryBooking = async (req, res) => {
  try {
    const bookBy = req.decoded_authorization.user_id
    const result = await bookingService.getHistoryBooking(bookBy)
    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Booking not found' })
    } else {
      return res.status(HTTP_STATUS.OK).json({
        message: 'Get history successfully',
        result
      })
    }
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' })
  }
}

export const getBookedTimeSlots = async (req, res) => {
  try {
    const { carId } = req.params
    const result = await bookingService.getBookedTimeSlots(carId)
    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Can not found' })
    } else {
      return res.status(HTTP_STATUS.OK).json({
        message: 'Get Booked Time Slots successfully',
        result
      })
    }
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' })
  }
}