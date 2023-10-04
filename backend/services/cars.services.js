import Cars from '../models/cars.model.js'

class CarsService {
  async getListCar() {
    try {
      const getListCar = await Cars.find()

      return getListCar
    } catch (error) {
      console.log(error)
    }
  }
  async getListCarById(carId) {
    try {
      const getListCarById = await Cars.findById(carId)

      return getListCarById
    } catch (error) {
      console.log(error)
    }
  }
  async createCar(payload) {
    const newCar = new Cars({
      ...payload
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
      const updateCar = await Cars.findByIdAndUpdate(carId, payload, { new: true })

      return updateCar
    } catch (error) {
      console.log(error)
    }
  }
  async deleteCar(carId) {
    try {
      const deleteCar = await Cars.findByIdAndDelete(carId, { new: true })

      return deleteCar
    } catch (error) {
      console.log(error)
    }
  }
}
const carsService = new CarsService()
export default carsService
