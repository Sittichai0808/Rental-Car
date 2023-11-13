import Cars from '../models/cars.model.js'
import Ratings from '../models/ratings.model.js'

class CarsService {
  async createCar(payloadBody) {
    try {
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
      const getCarById = await Cars.findById(carId).populate('brand', 'name').populate('model', 'name')
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

  async ratings(user_id, payload) {
    try {
      const { carId, bookingId, star, comment } = payload
      const newRatings = new Ratings({
        postBy: user_id,
        carId,
        bookingId,
        star,
        comment
      })
      const savedRating = await newRatings.save();

      const ratings = await Ratings.find({ carId: carId });
      const totalStars = ratings.reduce((total, rating) => total + rating.star, 0);
      const newTotalRatings = ratings.length > 0 ? totalStars / ratings.length : 0;

      // Cập nhật totalRatings của Car
      await Cars.updateOne({ _id: carId }, { totalRatings: newTotalRatings });

      return savedRating; // Trả về đánh giá đã lưu
    } catch (error) {
      throw error;
    }
  }


  async getRatingsOfCar(carId) {
    try {
      const getRatingsOfCar = await Ratings.find({ carId: carId }).populate('postBy', 'username profilePicture')
      return getRatingsOfCar
    } catch (error) {
      throw Error(error)
    }
  }

  async getRatingByBooking(bookingId) {
    try {
      const getRatingByBooking = await Ratings.find({ bookingId: bookingId })
      return getRatingByBooking
    } catch (error) {
      throw Error(error)
    }
  }

  async likeCars(user_id, carId) {
    try {
      const car = await Cars.findById(carId)
      const isLiked = car?.likes?.find(el => el.toString() === user_id)
      if (isLiked) {
        const result = await Cars.findByIdAndUpdate(carId, { $pull: { likes: user_id } }, { new: true })
        return result
      } else {
        const result = await Cars.findByIdAndUpdate(carId, { $push: { likes: user_id } }, { new: true })
        return result
      }
    } catch (error) {
      throw Error(error)
    }
  }

  async getCarsLikedByUser(userId) {
    try {
      const likedCars = await Cars.find({ likes: userId }).populate('brand').populate('model');
      return likedCars;
    } catch (error) {
      throw new Error('Error fetching liked cars for the user');
    }
  }
}
const carsService = new CarsService()
export default carsService
