import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true
    },
    weightKg: {
        type: Number,
        min: 0
    },
    lengthCm: {
        type: Number,
        min: 0
    },
    widthCm: {
        type: Number,
        min: 0
    },
    heightCm: {
        type: Number,
        min: 0
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1
    }
}, { _id: false });

const Package = mongoose.model('Package', packageSchema)

export default Package