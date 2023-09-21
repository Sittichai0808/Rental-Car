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
  signAccessToken(user_id) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
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
      return { user_id }
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

  async login(user_id) {
    const access_token = await this.signAccessToken(user_id)
    return { user_id, access_token }
  }
}

const usersService = new UsersService()

export default usersService
