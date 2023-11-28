import Bookings from '../models/booking.model.js'
import Contracts from '../models/contracts.model.js'
import FinalContracts from '../models/finalContracts.model.js'
import BookedTimeSlots from '../models/bookedTimeSlots.model.js'
import moment from 'moment-timezone'
class FinalContractsService {
  async createFinalContract(contractId, payload) {
    try {
      const { file, cost_settlement, timeFinish, note } = payload
      // Parse the input date using the 'DD-MM-YYYY' format and set the timezone to Asia/Ho_Chi_Minh (ICT)
      const formattedTimeFinish = moment.tz(timeFinish.concat(' 5:30'), 'YYYY-MM-DD HH:mm').toDate()
      console.log(formattedTimeFinish)
      const newFinalContract = new FinalContracts({
        contractId: contractId,
        timeFinish: formattedTimeFinish,
        ...payload
      })

      const finalContractResult = await newFinalContract.save()
      const getFinalContract = await FinalContracts.find({ _id: finalContractResult._id })
        .populate({
          path: 'contractId',
          populate: {
            path: 'createBy',
            model: 'User'
          }
        })
        .populate({
          path: 'contractId',
          populate: {
            path: 'bookingId',
            model: 'Bookings',
            populate: {
              path: 'bookBy',
              model: 'User'
            }
          }
        })

      await BookedTimeSlots.findOneAndUpdate(
        { bookingId: getFinalContract[0].contractId.bookingId._id },
        { $set: { to: formattedTimeFinish } },
        { new: true }
      )

      await Contracts.findByIdAndUpdate(contractId, { $set: { status: 'Đã tất toán' } }, { new: true })

      // await Contracts.findByIdAndUpdate(contractId, { $set: { status: 'Đã tất toán' } }, { new: true })

      return [finalContractResult, getFinalContract]
    } catch (error) {
      throw new Error(error)
    }
  }

  async getFinalContractById(createBy) {
    try {
      const getListBooking = await FinalContracts.find({})
        .populate({
          path: 'contractId',
          populate: {
            path: 'createBy',
            match: { _id: createBy },
            model: 'User'
          }
        })
        .populate({
          path: 'contractId',
          populate: {
            path: 'bookingId',
            model: 'Bookings',
            populate: {
              path: 'bookBy',
              model: 'User'
            }
          }
        })

      return getListBooking
    } catch (error) {
      throw error
    }
  }

  async getListFinalContracts() {
    try {
      const getListBooking = await FinalContracts.find({})
        .populate({
          path: 'contractId',
          populate: {
            path: 'createBy',
            model: 'User'
          }
        })
        .populate({
          path: 'contractId',
          populate: {
            path: 'bookingId',
            model: 'Bookings',
            populate: {
              path: 'bookBy',
              model: 'User'
            }
          }
        })

      return getListBooking
    } catch (error) {
      throw error
    }
  }
}

const finalContractsService = new FinalContractsService()
export default finalContractsService
