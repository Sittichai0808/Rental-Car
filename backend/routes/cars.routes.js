import express from 'express'
import { createCar, updateCar, getCarById, getListCars, uploadImagesCar } from '../controllers/cars.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator } from '../middlewares/users.middlewares.js'
import uploadCloud from '../utils/cloudinary.config.js'
const carsRoutes = express.Router()

carsRoutes.post('/createCar', uploadCloud.fields([
    { name: 'images', maxCount: 10 },
    { name: 'thumb', maxCount: 1 }
]), wrapRequestHandler(createCar))
carsRoutes.put('/updateCar/:carId', wrapRequestHandler(updateCar))
carsRoutes.get('/:carId', wrapRequestHandler(getCarById))
carsRoutes.get('/', wrapRequestHandler(getListCars))
carsRoutes.put('/uploadimage/:carId', uploadCloud.array('images', 10), wrapRequestHandler(uploadImagesCar))


export default carsRoutes