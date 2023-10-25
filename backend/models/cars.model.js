import mongoose from 'mongoose'

const carsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        brand: {
            type: mongoose.Types.ObjectId,
            ref: 'Brands'
        },
        model: {
            type: mongoose.Types.ObjectId,
            ref: 'Models'
        },
        numberSeat: {
            type: String,
            require: true
        },
        yearManufacture: {
            type: String,
            require: true
        },
        transmissions: {
            type: String,
            enum: ['Số tự động', 'Số sàn']
        },
        description: {
            type: String,
            require: true
        },
        thumb: {
            type: String,
        },
        images: {
            type: Array,
        },
        numberCar: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Chưa duyệt', 'Đã duyệt', 'Đã thuê', 'Chưa thuê'],
            default: 'Chưa duyệt'
        },
        cost: {
            type: Number,
        },
        totalRatings: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

const Cars = mongoose.model('Cars', carsSchema)

export default Cars
