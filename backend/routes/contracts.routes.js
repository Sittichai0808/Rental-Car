import express from 'express'

import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator, staffValidator } from '../middlewares/users.middlewares.js'
import { createContract, getContractById } from '../controllers/contracts.controllers.js'

const contractsRoutes = express.Router()

contractsRoutes.post(
  '/create/:bookingId',
  accessTokenValidator,
  adminValidator,
  staffValidator,
  wrapRequestHandler(createContract)
)

contractsRoutes.get('/', staffValidator, wrapRequestHandler(getContractById))
export default contractsRoutes
