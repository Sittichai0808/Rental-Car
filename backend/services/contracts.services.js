import Bookings from '../models/booking.model.js'
import Contracts from '../models/contracts.model.js'

class ContractsService {
  async createContract(createBy, bookingId, payload) {
    try {
      // Tạo hợp đồng mới và lưu vào cơ sở dữ liệu
      const newContract = new Contracts({
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

  async getContractById(createBy) {
    try {
      const getContract = await Contracts.find({ createBy: createBy })
        .populate('createBy')
        .populate({
          path: 'bookingId',
          populate: {
            path: 'bookBy',
            model: 'User'
          }
        })
        .sort({ createdAt: -1 })
      return getContract
    } catch (error) {
      throw error
    }
  }
}

const contractsService = new ContractsService()
export default contractsService
