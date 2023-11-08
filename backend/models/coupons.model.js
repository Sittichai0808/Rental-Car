import mongoose from 'mongoose'

const couponsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uppercase: true
        },
        discount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        expiry: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
)

const Coupons = mongoose.model('Coupons', couponsSchema);

export default Coupons;
