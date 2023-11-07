import { HTTP_STATUS } from '../constants/httpStatus.js'
import { CARS_MESSAGE } from '../constants/messages.js'
import contractsService from '../services/contracts.services.js'

export const createContract = async (req, res, next) => {
  console.log(req.body)
  const result = await contractsService.createContract(req.body)
  return res.status(HTTP_STATUS.CREATED).json({
    message: CARS_MESSAGE.CREATE_CAR_SUCCESS,
    result
  })
}

export const uploadFilePDFContract = async (req, res, next) => {
  try {
    const result = await contractsService.uploadFilePDFContract(req?.files)
    return res.status(HTTP_STATUS.OK).json({
      message: 'Upload file pdf successfully',
      result
    })
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Can not upload file pdf' })
  }
}
