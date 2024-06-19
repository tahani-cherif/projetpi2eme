import mongoose from "mongoose";
const { Schema, model } = mongoose;

const stationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    typeTransport: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "TypeTransport",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Station", stationSchema);
