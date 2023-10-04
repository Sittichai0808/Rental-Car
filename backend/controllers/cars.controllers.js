import { CARS_MESSAGE } from "../constants/messages.js";
import carsService from "../services/cars.services.js";

export const createCar = async (req, res, next) => {
    const result = await carsService.createCar(req.body)
    return res.json({
        message: CARS_MESSAGE.CREATE_CAR_SUCCESS, result
    })
}

export const updateCar = async (req, res, next) => {
    const { carId } = req.params
    const result = await carsService.updateCar(carId, req.body)
    return res.json({
        message: CARS_MESSAGE.UPDATE_CAR_SUCCESS, result
    })
}
