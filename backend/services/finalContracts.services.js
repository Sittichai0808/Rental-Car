import Bookings from '../models/booking.model.js'
import Contracts from '../models/contracts.model.js'
import FinalContracts from '../models/finalContracts.model.js'
import moment from 'moment-timezone'
class FinalContractsService {
  async createFinalContract(contractId, payload) {
    try {
      const { file, cost_settlement, timeFinish, note } = payload
      // Parse the input date using the 'DD-MM-YYYY' format and set the timezone to Asia/Ho_Chi_Minh (ICT)
      const formattedTimeFinish = moment.tz(timeFinish, 'DD-MM-YYYY', 'Asia/Ho_Chi_Minh').toDate()
      const newFinalContract = new FinalContracts({
        contractId: contractId,
        file: file,
        cost_settlement: cost_settlement,
        timeFinish: formattedTimeFinish,
        note: note
      })

      await newFinalContract.save()

      await Contracts.findByIdAndUpdate(contractId, { $set: { status: 'Đã tất toán' } }, { new: true })

      return newFinalContract
    } catch (error) {
      throw new Error(error)
    }
  }

  async createBooking(user_id, carId, payload) {
    try {
      const { timeBookingStart, timeBookingEnd } = payload

      const format = 'DD-MM-YYYY HH:mm'
      const bookingStart = moment(timeBookingStart, format)
      const bookingEnd = moment(timeBookingEnd, format)

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

  // async getContractById(createBy) {
  //   try {
  //     const getContract = await Contracts.find({ createBy: createBy })
  //       .populate('createBy')
  //       .populate({
  //         path: 'bookingId',
  //         populate: {
  //           path: 'bookBy',
  //           model: 'User'
  //         }
  //       })
  //       .sort({ createdAt: -1 })
  //     return getContract
  //   } catch (error) {
  //     throw error
  //   }
  // }
}

const finalContractsService = new FinalContractsService()
export default finalContractsService
