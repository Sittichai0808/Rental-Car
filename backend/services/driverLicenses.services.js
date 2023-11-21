import DriverLicenses from '../models/driverLicenses.model.js'
import User from '../models/user.model.js'

class DriverLicensesService {
  async regisLicensesDriver(payloadBody, payloadFile, userId) {
    try {
      if (payloadFile && payloadFile.path) {
        payloadBody.image = payloadFile.path
      }
      const { dob } = payloadBody
      const dobParts = dob.split('-')
      const dobDate = new Date(dobParts[2], dobParts[1] - 1, dobParts[0])

      if (!isNaN(dobDate.getTime())) {
        payloadBody.dob = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`
      }
      const result = await DriverLicenses.create({ ...payloadBody })
      await User.findByIdAndUpdate(userId, {
        driverLicenses: result._id
      })
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async acceptLicensesDriver(did, newStatus) {
    try {
      const acceptLicensesDriver = await DriverLicenses.findByIdAndUpdate(did, newStatus)
      return acceptLicensesDriver
    } catch (error) {
      throw new Error(error)
    }
  }

  async getLicensesDrivers() {
    try {
      const getLicensesDrivers = await DriverLicenses.find().sort({ status: 1 }) // Sắp xếp theo trạng thái tăng dần (Chưa xác thực trước)
        .exec();
      return getLicensesDrivers
    } catch (error) {
      throw new Error(error)
    }
  }
}

const driverLicensesService = new DriverLicensesService()
export default driverLicensesService
