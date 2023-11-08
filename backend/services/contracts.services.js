import Contracts from '../models/contracts.model.js'

class ContractsService {
  async createContract(createBy, payload) {
    try {
      const result = await Contracts.create({ createBy, ...payload })
      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}

const contractsService = new ContractsService()
export default contractsService
