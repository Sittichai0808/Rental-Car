import Cars from '../models/cars.model.js'
import Ratings from '../models/ratings.model.js'

class CarsService {
  async createCar(payloadBody, payloadFiles) {
    try {
      console.log(payloadFiles)
      const thumb = payloadFiles?.thumb[0]?.path
      const images = payloadFiles?.images?.map((el) => el.path)
      if (thumb) payloadBody.thumb = thumb
      if (images) payloadBody.images = images

      const result = await Cars.create({ ...payloadBody })
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
      throw new Error(error)
    }
  }

  async getCarById(carId) {
    console.log(carId)
    try {
      const getCarById = await Cars.findById(carId.toString() || '6332151ff01c77b98e74364a')
        .populate('brand', 'name')
        .populate('model', 'name')
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
      excludeFields.forEach((el) => delete queryObj[el])
      let queryStr = JSON.stringify(queryObj)
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

      let getListCars = Cars.find(JSON.parse(queryStr))
        .populate('brand', 'name')
        .populate('model', 'name')
        .populate('user', 'username')

      // Sorting
      if (sort) {
        const sortBy = sort.split(',').join(' ')
        getListCars = getListCars.sort(sortBy)
      } else {
        getListCars = getListCars.sort('-createdAt')
      }

      // Limiting the fields
      if (fields) {
        const field = fields.split(',').join(' ')
        getListCars = getListCars.select(field)
      } else {
        getListCars = getListCars
      }

      // pagination

      const skip = (page - 1) * limit
      getListCars = getListCars.skip(skip).limit(limit)
      if (page) {
        const carCount = await Cars.countDocuments()
        if (skip >= carCount) throw new Error('This Page does not exist')
      }
      const cars = await getListCars
      return cars
    } catch (error) {
      console.log(error)
    }
  }

  async uploadImagesCar(carId, payload) {
    try {
      console.log(payload)
      if (!payload) throw new Error('Missing input')
      const uploadImagesCar = await Cars.findByIdAndUpdate(
        carId,
        { $push: { images: { $each: payload.map((el) => el.path) } } },
        { new: true }
      )
      return uploadImagesCar
    } catch (error) {
      throw new Error('Error uploading images')
    }
  }

  async ratings(user_id, carId, payload) {
    try {
      const { star, comment } = payload

      // const existingRating = await Ratings.findOne({ postBy: user_id, car: carId });

      // if (existingRating) {
      //     existingRating.star = star;
      //     existingRating.comment = comment;
      //     await existingRating.save();
      //     return 'Đánh giá đã được cập nhật.';
      // } else {
      const newRatings = new Ratings({
        postBy: user_id,
        carId: carId,
        star,
        comment
      })
      await newRatings.save()

      const ratings = await Ratings.find({ carId: carId })
      const totalStars = ratings.reduce((total, rating) => total + rating.star, 0)
      const newTotalRatings = ratings.length > 0 ? totalStars / ratings.length : 0

      await Cars.updateOne({ _id: carId }, { totalRatings: newTotalRatings })
      // }
    } catch (error) {
      throw error
    }
  }
}
const carsService = new CarsService()
export default carsService
