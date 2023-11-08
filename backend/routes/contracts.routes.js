import express from 'express'

import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator, staffValidator } from '../middlewares/users.middlewares.js'
import { createContract } from '../controllers/contracts.controllers.js'

const contractsRoutes = express.Router()

contractsRoutes.post(
  '/create',
  [accessTokenValidator, adminValidator, staffValidator],
  wrapRequestHandler(createContract)
)
export default contractsRoutes
