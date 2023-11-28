import express from 'express'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminAndStaffValidator } from '../middlewares/users.middlewares.js'
import { createCoupons, getCoupons, updateCoupons } from '../controllers/coupons.controllers.js'

const couponsRoutes = express.Router()

couponsRoutes.post('/create', adminAndStaffValidator, wrapRequestHandler(createCoupons))
couponsRoutes.get('/', wrapRequestHandler(getCoupons))
couponsRoutes.put('/update/:cid', adminAndStaffValidator, wrapRequestHandler(updateCoupons))
export default couponsRoutes