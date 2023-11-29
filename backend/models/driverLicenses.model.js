import mongoose from 'mongoose'

const driverLicensesSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    drivingLicenseNo: {
      type: String
    },
    class: {
      type: String
    },
    status: {
      type: String,
      enum: ['Chưa xác thực', 'Đã xác thực'],
      default: 'Chưa xác thực'
    }
  },
  { timestamps: true }
)

const DriverLicenses = mongoose.model('DriverLicenses', driverLicensesSchema)

export default DriverLicenses
