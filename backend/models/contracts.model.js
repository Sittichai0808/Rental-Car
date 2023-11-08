import mongoose from 'mongoose'
const contractsSchema = new mongoose.Schema(
  {
    createBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    customer_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    car_id: { type: mongoose.Types.ObjectId, ref: 'Cars' },
    file: { type: String, required: true },
    time_booking_end: { type: Date, required: true },
    time_booking_start: { type: Date, required: true }
  },
  { timestamps: true }
)
const Contracts = mongoose.model('Contracts', contractsSchema)
export default Contracts
