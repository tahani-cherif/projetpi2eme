import mongoose from "mongoose";
const { Schema, model } = mongoose;
const HotelShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    stars: {
      type: String,
    },
    pricePerNight: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model("Hotel", HotelShema);
