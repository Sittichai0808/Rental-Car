import express from 'express'
import { acceptLicensesDriver, regisLicensesDriver } from '../controllers/driverLincenses.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator } from '../middlewares/users.middlewares.js'
import uploadCloud from '../utils/cloudinary.config.js'
const driverLicensesRoutes = express.Router()

driverLicensesRoutes.post('/registerDriver', uploadCloud.single('image'), wrapRequestHandler(regisLicensesDriver))
driverLicensesRoutes.put('/acceptDriver/:did', wrapRequestHandler(acceptLicensesDriver))

export default driverLicensesRoutes

