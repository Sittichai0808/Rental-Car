import Cars from '../models/cars.model.js'

class CarsService {
    async createCar(payload) {
        const newCar = new Cars({
            ...payload,
        })
        try {
            const result = await newCar.save()
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async updateCar(carId, payload) {
        try {
            const updateCar = await Cars.findByIdAndUpdate(carId, payload, { new: true });

            return updateCar
        } catch (error) {
            throw new Error(error)
        }

    }

    async getCarById(carId) {
        try {
            const getCarById = await Cars.findById(carId)

            return getCarById
        } catch (error) {
            console.log(error)
        }
    }

    async getListCars() {
        try {
            const getListCars = await Cars.find().populate('brand', 'name').populate('model', 'name').populate('user', 'username')
            return getListCars
        } catch (error) {
            console.log(error)
        }
    }


}
const carsService = new CarsService()
export default carsService