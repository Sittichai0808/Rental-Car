import mongoose from 'mongoose'
const finalContractsSchema = new mongoose.Schema(
  {
    contractId: { type: mongoose.Types.ObjectId, ref: 'Contracts' },
    file: { type: String, required: true },
    cost_settlement: { type: Number },
    timeFinish: { type: Date },
    note: { type: String }
  },
  { timestamps: true }
)
const FinalContracts = mongoose.model('FinalContracts', finalContractsSchema)
export default FinalContracts
