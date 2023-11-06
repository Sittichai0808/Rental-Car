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
    profilePicture: {
      type: String,
      default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
    },
    address: {
      type: String
    },
    driverLicenses: {
      type: mongoose.Types.ObjectId,
      ref: "DriverLicenses"
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
