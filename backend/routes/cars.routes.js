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
import { accessTokenValidator, adminValidator, staffValidator } from '../middlewares/users.middlewares.js'
import uploadCloud from '../utils/cloudinary.config.js'
const carsRoutes = express.Router()

carsRoutes.post('/createCar', [accessTokenValidator, adminValidator, staffValidator], wrapRequestHandler(createCar))
carsRoutes.put('/updateCar/:carId', accessTokenValidator, adminValidator, wrapRequestHandler(updateCar))
carsRoutes.get('/:carId', wrapRequestHandler(getCarById))
carsRoutes.get('/', wrapRequestHandler(getListCars))
carsRoutes.post(
  '/uploadimage/:carId',
  uploadCloud.fields([
    { name: 'images', maxCount: 10 },
    { name: 'thumb', maxCount: 1 }
  ]),
  wrapRequestHandler(uploadImagesCar)
)

carsRoutes.post('/:carId/rating', accessTokenValidator, wrapRequestHandler(ratings))

export default carsRoutes
