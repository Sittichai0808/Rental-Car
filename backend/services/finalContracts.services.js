import Bookings from '../models/booking.model.js'
import Contracts from '../models/contracts.model.js'
import FinalContracts from '../models/finalContracts.model.js'
class FinalContractsService {
  async createFinalContract(createBy, contractId, payload) {
    try {
      // Tạo hợp đồng mới và lưu vào cơ sở dữ liệu
      const newContract = new FinalContracts({
        createBy: createBy,
        bookingId: bookingId,
        ...payload
      })
      const savedContract = await newContract.save()

      // Cập nhật trường 'contract' trong bản ghi booking tương ứng
      const booking = await Bookings.findByIdAndUpdate(
        bookingId,
        { contract: savedContract._id, status: 'Đã có hợp đồng' },
        { new: true } // Để nhận kết quả cập nhật mới
      )

      return savedContract, booking // Trả về hợp đồng vừa tạo
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
