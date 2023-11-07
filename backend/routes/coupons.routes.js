import express from 'express'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator, staffValidator } from '../middlewares/users.middlewares.js'
import { createCoupons, getCoupons, updateCoupons } from '../controllers/coupons.controllers.js'

const couponsRoutes = express.Router()

couponsRoutes.post('/create', [accessTokenValidator, adminValidator, staffValidator], wrapRequestHandler(createCoupons))
couponsRoutes.get('/', wrapRequestHandler(getCoupons))
couponsRoutes.put('/update/:cid', [accessTokenValidator, adminValidator, staffValidator], wrapRequestHandler(updateCoupons))
export default couponsRoutes