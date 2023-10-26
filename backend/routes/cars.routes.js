import express from 'express'
import {
  createCar,
  updateCar,
  getCarById,
  getListCars,
  uploadImagesCar,
  ratings
} from '../controllers/cars.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator } from '../middlewares/users.middlewares.js'
import uploadCloud from '../utils/cloudinary.config.js'
const carsRoutes = express.Router()

carsRoutes.post(
  '/createCar',
  accessTokenValidator,
  adminValidator,
  uploadCloud.fields([
    { name: 'images', maxCount: 10 },
    { name: 'thumb', maxCount: 1 }
  ]),
  wrapRequestHandler(createCar)
)
carsRoutes.put('/updateCar/:carId', accessTokenValidator, adminValidator, wrapRequestHandler(updateCar))
carsRoutes.get('/:carId', accessTokenValidator, wrapRequestHandler(getCarById))
carsRoutes.get('/', wrapRequestHandler(getListCars))
carsRoutes.put('/uploadimage/:carId', uploadCloud.array('images', 10), wrapRequestHandler(uploadImagesCar))
carsRoutes.post('/:carId/rating', accessTokenValidator, wrapRequestHandler(ratings))

export default carsRoutes
