import mongoose from 'mongoose'
import moment from 'moment-timezone'
const finalContractsSchema = new mongoose.Schema(
  {
    contractId: { type: mongoose.Types.ObjectId, ref: 'Contracts' },
    file: { type: String, required: true },
    cost_settlement: { type: Number },
    timeFinish: {
      type: Date,
      require: true,
      get: (v) => moment(v).format('YYYY-MM-DD HH:mm'),
      set: (v) => moment(v, 'YYYY-MM-DD HH:mm').toDate()
    },
    note: { type: String }
  },
  { timestamps: true }
)
const FinalContracts = mongoose.model('FinalContracts', finalContractsSchema)
export default FinalContracts
