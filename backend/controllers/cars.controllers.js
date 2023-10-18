import { HTTP_STATUS } from "../constants/httpStatus.js";
import { CARS_MESSAGE } from "../constants/messages.js";
import carsService from "../services/cars.services.js";

export const createCar = async (req, res, next) => {
    console.log(req.body)
    const result = await carsService.createCar(req.body, req?.files)
    return res.status(HTTP_STATUS.CREATED).json({
        message: CARS_MESSAGE.CREATE_CAR_SUCCESS,
        result
    })
}

export const updateCar = async (req, res, next) => {
    const { carId } = req.params
    try {
        const result = await carsService.updateCar(carId, req.body, { new: true });
        if (!result) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong!'
            });
        } else {
            if (!result.updatedProperty) {
                console.log(result)
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    message: 'Update failed!'
                });

            } else {
                return res.status(HTTP_STATUS.OK).json({
                    message: CARS_MESSAGE.UPDATE_CAR_SUCCESS,
                    result
                });
            }
        }
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong!',
            error: error.message
        });
    }

}

export const getCarById = async (req, res, next) => {
    try {
        const { carId } = req.params
        const result = await carsService.getCarById(carId)
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Car not found' })
        } else {
            return res.json({
                message: CARS_MESSAGE.GET_CAR_SUCCESS,
                result
            })
        }
    } catch (e) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' })
    }
}

export const getListCars = async (req, res, next) => {
    try {
        const result = await carsService.getListCars(req.query);
        return res.status(HTTP_STATUS.OK).json({
            message: CARS_MESSAGE.GET_CARS_SUCCESS,
            result
        })

    } catch (error) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Can not get list cars' })
    }
}

export const uploadImagesCar = async (req, res, next) => {
    const { carId } = req.params
    try {
        const result = await carsService.uploadImagesCar(carId, req.files)
        return res.status(HTTP_STATUS.OK).json({
            message: 'Upload images successfully',
            result
        })
    } catch (error) {
        return res.status(HTTP_STATUS.InternalServerError).json({ error: 'Can not upload images' })
    }
}