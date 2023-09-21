import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
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
    phone: {
      type: Number,
      unique: true
    }

    // profilePicture: {
    //   type: String,
    //   default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
    // }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
