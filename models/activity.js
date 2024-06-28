import mongoose from "mongoose";
const { Schema, model } = mongoose;
const ActivityShema = new Schema(
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
    schedule: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model("Activity", ActivityShemaShema);
