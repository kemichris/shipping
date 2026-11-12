import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  street: { type: String, trim: true, default: "" },
  city: { type: String, trim: true, default: "" },
  state: { type: String, trim: true, default: "" },
  country: { type: String, trim: true, default: "" },
  postalCode: { type: String, trim: true, default: "" },
  placeId: { type: String, trim: true, default: "" },
  coordinates: { type: [Number], default: [] },
}, { _id: false });

export default addressSchema;
