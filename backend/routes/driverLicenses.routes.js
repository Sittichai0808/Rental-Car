import express from 'express'
import { acceptLicensesDriver, regisLicensesDriver } from '../controllers/driverLincenses.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator, staffValidator } from '../middlewares/users.middlewares.js'
import uploadCloud from '../utils/cloudinary.config.js'
const driverLicensesRoutes = express.Router()

driverLicensesRoutes.post(
  '/registerDriver',
  accessTokenValidator,
  uploadCloud.single('image'),
  wrapRequestHandler(regisLicensesDriver)
)
driverLicensesRoutes.put(
  '/acceptDriver/:did',
  adminValidator || staffValidator,
  wrapRequestHandler(acceptLicensesDriver)
)

export default driverLicensesRoutes
