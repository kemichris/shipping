import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, { _id: false });


const Address = mongoose.model('Address', addressSchema)

export default Address