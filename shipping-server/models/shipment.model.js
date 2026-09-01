import mongoose from 'mongoose'

const shipmentSchema = new mongoose.Schema({
    trackingNumber: String,       // unique, human-friendly
    referenceNumber: String,
    sender: {
        name: String,
        phone: String,
        email: String,
        address: Address
    },

    recipient: {
        name: String,
        phone: String,
        email: String,
        address: Address
    },

    package: {
        description: String,
        weightKg: Number,
        lengthCm: Number,
        widthCm: Number,
        heightCm: Number,
        quantity: Number
    },

    status: {
        type: String,
        enum: ['pending', 'enroute', 'delivered'],
        default: 'pending'
    },

    currentLocation: {
        label: String,
        coordinates: [Number],      // [longitude, latitude] for MongoDB GeoJSON
        updatedAt: Date
    },

    estimatedDeliveryDate: Date,
    deliveredAt: Date,

    trackingEvents: [{
        status: String,
        message: String,
        location: {
            label: String,
            coordinates: [Number]
        },
        occurredAt: Date,
        updatedBy: ObjectId
    }],

    createdBy: ObjectId,
    createdAt: Date,
    updatedAt: Date

})

const Shipment = mongoose.model("shipment", shipmentSchema);

export default Shipment;