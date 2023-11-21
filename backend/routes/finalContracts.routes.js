import express from 'express'

import { wrapRequestHandler } from '../utils/handlers.js'
import {
  accessTokenValidator,
  adminAndStaffValidator,
  adminValidator,
  staffValidator
} from '../middlewares/users.middlewares.js'
import { createFinalContract } from '../controllers/finalContracts.controllers.js'

const finalContractsRoutes = express.Router()

finalContractsRoutes.post('/create/:contractId', adminAndStaffValidator, wrapRequestHandler(createFinalContract))

export default finalContractsRoutes
