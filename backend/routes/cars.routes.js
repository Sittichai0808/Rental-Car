import express from 'express'
import { createCar, updateCar, getCarById, getListCars } from '../controllers/cars.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator } from '../middlewares/users.middlewares.js'
const carsRoutes = express.Router()

carsRoutes.post('/createCar', wrapRequestHandler(createCar))
carsRoutes.put('/updateCar/:carId', wrapRequestHandler(updateCar))
carsRoutes.get('/:carId', wrapRequestHandler(getCarById))
carsRoutes.get('/', getListCars)


export default carsRoutes