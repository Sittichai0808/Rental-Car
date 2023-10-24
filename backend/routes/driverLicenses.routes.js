import express from 'express'
import { regisLicensesDriver } from '../controllers/driverLincenses.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator } from '../middlewares/users.middlewares.js'
import uploadCloud from '../utils/cloudinary.config.js'
const driverLicensesRoutes = express.Router()

driverLicensesRoutes.post('/registerDriver', uploadCloud.single('image'), wrapRequestHandler(regisLicensesDriver))

export default driverLicensesRoutes

