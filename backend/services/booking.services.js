import Bookings from '../models/booking.model.js'
import BookedTimeSlots from '../models/bookedTimeSlots.model.js'
import moment from 'moment-timezone'

class BookingServices {
  async createBooking(user_id, carId, payload) {
    try {
      const { timeBookingStart, timeBookingEnd } = payload

      console.log(timeBookingStart, timeBookingEnd)

      const bookingStart = moment.utc(timeBookingStart).toDate()
      const bookingEnd = moment.utc(timeBookingEnd).toDate()
      console.log(bookingStart, bookingEnd)
      // if (!bookingStart.isValid() || !bookingEnd.isValid()) {
      //     throw new Error('Invalid input')
      // }

      // const overlappingSlots = await BookedTimeSlots.find({
      //     carId: carId,
      //     from: bookingStart.toISOString(),
      //     to: bookingEnd.toISOString()
      // });

      // if (overlappingSlots.length > 0) {
      //     throw new Error('The time slot is booked');
      // }

      const newBooking = new Bookings({
        bookBy: user_id,
        carId: carId,
        timeBookingStart: bookingStart,
        timeBookingEnd: bookingEnd,
        ...payload
      })

      const bookingResult = await newBooking.save()

      const newBookedTimeSlot = new BookedTimeSlots({
        bookingId: bookingResult._id, // Lấy ID của đặt chỗ vừa tạo
        from: bookingStart,
        to: bookingEnd,
        carId: carId
      })

      await newBookedTimeSlot.save()
      return { bookingResult, newBookedTimeSlot }
    } catch (error) {
      throw error
    }
  }

  async cancelBooking(bookingId) {
    try {
      const booking = await Bookings.findById(bookingId)

      if (!booking) {
        return null
      }

      // const { timeBookingStart } = booking;
      // const currentDate = moment().toISOString();
      // console.log(currentDate)
      // const bookingStart = moment(timeBookingStart).toISOString();
      // console.log(bookingStart)

      // if (bookingStart.isSame(currentDate, 'day')) {
      //     throw new Error('Reservations cannot be canceled on the current date');
      // }

      const updateBooking = await Bookings.findByIdAndUpdate(bookingId, { status: 'Đã hủy' }, { new: true })

      if (!updateBooking) {
        return null
      }
      await BookedTimeSlots.deleteMany({ bookingId: bookingId })
      return updateBooking
    } catch (error) {
      throw error
    }
  }

  async getHistoryBooking(bookBy) {
    try {
      const getHistoryBooking = await Bookings.find({ bookBy: bookBy })
        .populate({
          path: 'carId',
          populate: {
            path: 'brand',
            model: 'Brands'
          }
        })
        .populate({
          path: 'carId',
          populate: {
            path: 'model',
            model: 'Models'
          }
        })
        .populate('contract')
        .sort({ createdAt: -1 })
      return getHistoryBooking
    } catch (error) {
      throw error
    }
  }

  async getListBooking() {
    try {
      const getListBooking = await Bookings.find({})
        .populate('bookBy', 'username ')
        .populate({
          path: 'carId',
          populate: [
            {
              path: 'model',
              model: 'Models'
            },
            { path: 'brand', model: 'Brands' }
          ]

          // model: 'numberCar numberSeat yearManufacture'
        })
        .populate('contract')
        .sort({ createdAt: -1 })
      return getListBooking
    } catch (error) {
      throw error
    }
  }

  async getBookedTimeSlots(carId) {
    try {
      const getBookedTimeSlots = await BookedTimeSlots.find({ carId: carId })
      return getBookedTimeSlots
    } catch (error) {
      throw error
    }
  }
}
const bookingService = new BookingServices()
export default bookingService
