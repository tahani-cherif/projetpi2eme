import mongoose from "mongoose";
const { Schema, model } = mongoose;
const RestaurantShema = new Schema(
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
    kitchen: {
      type: String,
    },
    averageprice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model("Restaurant", RestaurantShema);
