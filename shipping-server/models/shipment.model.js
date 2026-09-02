import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    referenceNumber: {
      type: String,
      trim: true,
    },

    sender: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: String,
      email: String,
      address: {
        type: addressSchema,
        required: true,
      },
    },

    recipient: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: String,
      email: String,
      address: {
        type: addressSchema,
        required: true,
      },
    },

    shippingMode: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    serviceMode: {
      type: String,
    },

    package: {
      type: packageSchema,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "picked_up",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
      index: true,
    },

    currentLocation: {
      label: String,

      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
      },

      updatedAt: Date,
    },

    estimatedDeliveryDate: Date,

    deliveredAt: Date,

    trackingEvents: [
      {
        status: {
          type: String,
          required: true,
        },

        message: {
          type: String,
          required: true,
        },

        location: {
          label: {
            type: String,
            required: true,
          },
          coordinates: {
            type: [Number],
            required: true,
          },
        },

        occurredAt: {
          type: Date,
          default: Date.now,
        },

        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Shipment = mongoose.model("shipment", shipmentSchema);

export default Shipment;
