import express from 'express'
import { adminAndStaffValidator, adminValidator } from '../middlewares/users.middlewares.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { getUsers, getStaffs, getDetailUser, createStaff, updateStatusUser } from '../controllers/admins.controllers.js'
const adminRoutes = express.Router()

adminRoutes.get('/list-users', adminAndStaffValidator, wrapRequestHandler(getUsers))
adminRoutes.get('/staffs', adminValidator, wrapRequestHandler(getStaffs))
adminRoutes.get('/staffs', wrapRequestHandler(getStaffs))
adminRoutes.post('/create-staffs', adminValidator, wrapRequestHandler(createStaff))
adminRoutes.put('/update-status/:userId', adminAndStaffValidator, wrapRequestHandler(updateStatusUser))
adminRoutes.get('/get-user/:userId', adminAndStaffValidator, wrapRequestHandler(getDetailUser))

export default adminRoutes
