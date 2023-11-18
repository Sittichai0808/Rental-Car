import driverLicensesService from '../services/driverLicenses.services.js'
import { HTTP_STATUS } from '../constants/httpStatus.js'

export const regisLicensesDriver = async (req, res, next) => {
  try {
    const userId = req.decoded_authorization.user_id
    const result = await driverLicensesService.regisLicensesDriver(req.body, req?.file, userId)
    return res.status(HTTP_STATUS.OK).json({
      message: 'Register Driver License successfully',
      result
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error'
    })
  }
}

export const acceptLicensesDriver = async (req, res, next) => {
  const { did } = req.params
  const newStatus = req.body
  try {
    // console.log(typeof newStatus)
    // if (newStatus !== 'Chưa xác thực' || newStatus !== 'Đã xác thực') {
    //     return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid Status' });
    // }

    const result = await driverLicensesService.acceptLicensesDriver(did, newStatus)
    if (!result) return result.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Can not found' })
    return res.status(HTTP_STATUS.OK).json({
      message: 'Accept Successfully',
      result
    })
  } catch (error) {}
}
