import express from 'express'
import { createCar, updateCar } from '../controllers/cars.controllers.js'
const carsRoutes = express.Router()

carsRoutes.post('/createCar', createCar)
carsRoutes.put('/updateCar/:carId', updateCar)

export default carsRoutes