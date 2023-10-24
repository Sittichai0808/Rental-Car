import mongoose from "mongoose";

const ratingsSchema = new mongoose.Schema(

    {
        postBy: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        car: {
            type: mongoose.Types.ObjectId,
            ref: "Cars"
        },
        comment: {
            type: String,
        },
        star: {
            type: Number
        }
    },
    { timestamps: true }
);

const Ratings = mongoose.model('Ratings', ratingsSchema)
export default Ratings;