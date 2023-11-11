import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'staff'],
      default: 'user'
    },
    date_of_birth: {
      type: String
    },
    userCars: {
      type: Array
    },
    driverLicenses: {
      type: ObjectId
    },

    profilePicture: {
      type: Array,
      default: 'https://res.cloudinary.com/djllhxlfc/image/upload/v1699417003/cars/default_avatar_jwbg8s.jpg'
    },
    address: {
      type: String
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
