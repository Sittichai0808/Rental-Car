import mongoose from 'mongoose'
import moment from 'moment'

const bookedTimeSlotsSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Types.ObjectId,
      ref: 'Booking', // Tham chiếu đến bảng Booking
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    },
    carId: {
      type: mongoose.Types.ObjectId,
      ref: 'Cars', // Tham chiếu đến bảng Cars (xe)
      required: true
    }
  },
  { timestamps: true }
)

const BookedTimeSlots = mongoose.model('BookedTimeSlots', bookedTimeSlotsSchema)

export default BookedTimeSlots
