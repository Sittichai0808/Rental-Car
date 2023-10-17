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

    async getListCars(payload) {
        try {
            // Filtering
            const queryObj = { ...payload }
            const { sort, fields, page, limit } = payload
            const excludeFields = ['page', 'sort', 'limit', 'fields']
            excludeFields.forEach((el) => delete queryObj[el]);
            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

            let getListCars = Cars.find(JSON.parse(queryStr)).populate('brand', 'name').populate('model', 'name').populate('user', 'username')

            // Sorting
            if (sort) {
                const sortBy = sort.split(",").join(" ");
                getListCars = getListCars.sort(sortBy)
            } else {
                getListCars = getListCars.sort('-createdAt')
            }

            // Limiting the fields
            if (fields) {
                const field = fields.split(",").join(" ");
                getListCars = getListCars.select(field)
            } else {
                getListCars = getListCars
            }

            // pagination

            const skip = (page - 1) * limit;
            console.log(page, limit, skip)
            getListCars = getListCars.skip(skip).limit(limit)
            if (page) {
                const carCount = await Cars.countDocuments();
                if (skip >= carCount) throw new Error('This Page does not exist')
            }
            const cars = await getListCars
            return cars

        } catch (error) {
            console.log(error)
        }
    }


}
const carsService = new CarsService()
export default carsService