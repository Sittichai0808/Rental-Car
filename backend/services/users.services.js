import { config } from 'dotenv'
import { USER_MESSAGES } from '../constants/messages.js'
import { signToken } from '../utils/jwt.js'
import databaseServices from './database.services.js'
import { ObjectId } from 'mongodb'
import User from '../models/user.model.js'
import { hashPassword } from '../utils/crypto.js'
import { TokenType } from '../constants/enums.js'
config()
class UsersService {
  signAccessToken(user_id, role) {
    console.log(user_id, role)
    return signToken({
      payload: { user_id: user_id, role, token_type: TokenType.AccessToken },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN
      // options: {
      //   expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      // }
    })
  }

  async register(payload) {
    const user_id = new ObjectId()
    // const email_verify_token = await this.signEmailVerifyToken(user_id.toString())
    // console.log('email_verify_token: ', email_verify_token)
    const newUser = new User({
      ...payload,
      _id: user_id,

      password: hashPassword(payload.password).toString()
    })
    try {
      await newUser.save()
      // const access_token = await this.signAccessToken(user_id.toString())
      return { user_id, role }
    } catch (error) {
      console.log(error)
    }

    // await databaseServices.refreshTokens.insertOne(
    //   new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
    // )
  }

  async checkExistEmail(email) {
    const user = await User.findOne({ email })
    return Boolean(user)
  }

  async login(payload) {
    const user = { ...payload }

    const { password: hashedPassword, role, _id, ...rest } = user._doc

    const access_token = await this.signAccessToken(_id.toString(), role)
    return { rest, access_token }
  }

  async google(payload) {
    try {
      const user = { ...payload }
      const user1 = await User.findOne({ email: user.email })
      if (user1) {
        const access_token = await this.signAccessToken(user1._id.toString(), user1.role)

        const { password: hashedPassword, ...rest } = user1._doc

        return { rest, access_token }
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        const hashedPassword1 = hashPassword(generatedPassword).toString()
        const newUser = new User({
          username: user.username.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8),
          email: user.email,
          password: hashedPassword1,
          profilePicture: user.photo,
          phoneNumber: ''
        })
        await newUser.save()
        const user2 = await User.findOne({ email: user.email })
        const { _id } = user2._doc
        const access_token = await this.signAccessToken(_id.toString(), 'user')

        const { password: hashedPassword2, ...rest } = newUser._doc
        return { rest, access_token }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getUser(payload) {
    const { user_id } = { ...payload }

    try {
      const getUser = await User.findOne({ _id: user_id.toString() })
      return getUser
    } catch (error) {}
  }

  async updateUser(user_id, payload) {
    try {
      // if (payload.password) {
      //   password =
      // }
      const updateUser = await User.findByIdAndUpdate(
        user_id.toString(),
        { password: hashPassword(payload.password).toString(), ...payload },
        { new: true }
      )
      return updateUser
    } catch (error) {
      console.log(error)
    }
  }

  async resetPassword(payload) {
    try {
      const user = await User.findOne({ email: payload.email })

      const resetPassword = await User.findByIdAndUpdate(
        user._id.toString(),
        { $set: { password: hashPassword(payload.password).toString() } },
        { new: true }
      )
      return resetPassword
    } catch (error) {
      console.log(error)
    }
  }

  async getUsers() {
    try {
      return await User.find()
    } catch (error) {
      throw Error(error)
    }
  }
}

export default new UsersService()
