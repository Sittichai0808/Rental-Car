import express from 'express'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator, staffValidator } from '../middlewares/users.middlewares.js'
import { createCoupon, deleteCoupon, getCoupons, updateCoupons } from '../controllers/coupons.controllers.js'

const couponsRoutes = express.Router()

couponsRoutes.post('/createCoupon', wrapRequestHandler(createCoupon))
couponsRoutes.get('/', wrapRequestHandler(getCoupons))
couponsRoutes.put('/update/:cid', [accessTokenValidator, adminValidator, staffValidator], wrapRequestHandler(updateCoupons))
couponsRoutes.delete('/ :cid', [accessTokenValidator, adminValidator, staffValidator], wrapRequestHandler(deleteCoupon))


export default couponsRoutes