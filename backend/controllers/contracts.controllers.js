import { HTTP_STATUS } from '../constants/httpStatus.js'
import contractsService from '../services/contracts.services.js'

export const createContract = async (req, res, next) => {
  try {
    const createBy = req.decoded_authorization.user_id // Retrieve user_id from req.decoded_authorization
    const result = await contractsService.createContract(createBy, req.body) // Pass user_id as createBy
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create contract successfully',
      result
    })
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
}
