import mongoose from 'mongoose'
const finalContractsSchema = new mongoose.Schema(
  {
    createBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    bookingId: { type: mongoose.Types.ObjectId, ref: 'Bookings' },
    contractId: { type: mongoose.Types.ObjectId, ref: 'Contracts' },
    file: { type: String, required: true },
    cost_settlement: { type: Number },
    note: { type: String }
  },
  { timestamps: true }
)
const FinalContracts = mongoose.model('FinalContracts', finalContractsSchema)
export default FinalContracts
