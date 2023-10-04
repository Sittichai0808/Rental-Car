import express from 'express'
import { getListCar, getListCarById, createCar, updateCar, deleteCar } from '../controllers/cars.controllers.js'
const carsRoutes = express.Router()

carsRoutes.get('/getListCar', getListCar)
carsRoutes.get('/getListCarById/:carId', getListCarById)
carsRoutes.post('/createCar', createCar)
carsRoutes.put('/updateCar/:carId', updateCar)
carsRoutes.delete('/deleteCar/:carId', deleteCar)

export default carsRoutes
