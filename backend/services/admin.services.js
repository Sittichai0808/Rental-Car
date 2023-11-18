import User from "../models/user.model.js"
import { hashPassword } from '../utils/crypto.js'

class AdminServices {
    async getUsers() {
        try {
            return await User.find({ role: 'user' }).populate('driverLicenses')
        } catch (error) {
            throw Error(error)
        }
    }

    async getDetailUser(userId) {
        try {
            const getDetailUser = await User.findById(userId).populate('driverLicenses')
            return getDetailUser
        } catch (error) {
            console.log(error)
        }
    }


    async getStaffs() {
        try {
            return await User.find({ role: 'staff' })
        } catch (error) {
            throw Error(error)
        }
    }

    async createStaff(payload) {
        const newUser = new User({
            ...payload,
            password: hashPassword(payload.password).toString(),
            role: 'staff'
        })
        try {
            const user = await newUser.save()
            return user
        } catch (error) {
            throw Error(error)
        }
    }

    async updateStatusUser(userId, payload) {
        try {
            const { status } = payload
            const updateStatusUser = await User.findByIdAndUpdate(userId, { status: status }, { new: true })
            return updateStatusUser
        } catch (error) {
            throw error
        }
    }
}
const adminServices = new AdminServices()
export default adminServices