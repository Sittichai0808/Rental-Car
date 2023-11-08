import mongoose from 'mongoose'
import moment from 'moment'

const bookingsSchema = new mongoose.Schema(
  {
    bookBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    carId: {
      type: mongoose.Types.ObjectId,
      ref: 'Cars'
    },
    timeBookingStart: {
      type: Date,
      require: true,
      get: (v) => moment(v).format('DD-MM-YYYY HH:mm'),
      set: (v) => moment(v, 'DD-MM-YYYY HH:mm').toDate()
    },
    timeBookingEnd: {
      type: Date,
      require: true,
      get: (v) => moment(v).format('DD-MM-YYYY HH:mm'),
      set: (v) => moment(v, 'DD-MM-YYYY HH:mm').toDate()
    },
    fullname: {
      type: String
    },
    phone: {
      type: String,
      require: true
    },
    address: {
      type: String,
      require: true
    },
    totalCost: {
      type: Number,
      require: true
    },
    codeTransaction: {
      type: String,
      require: true
    },
    timeTransaction: {
      type: String,
      require: true
    },
    status: {
      type: String,
      enum: ['Thành công', 'Đã Hủy'],
      default: 'Thành công'
    }
  },
  { timestamps: true }
)

const Bookings = mongoose.model('Bookings', bookingsSchema)

export default Bookings
