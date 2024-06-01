import mongoose from "mongoose";
const { Schema, model } = mongoose;
const LoisirSchema = new Schema(
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
      required: true,
    },
    schedule: {
      type: String,
    },
    price: {
      type: Number,
    },
    stars: {
      type: String,
    },
    pricePerNight: {
      type: Number,
    },
    kitchen: {
      type: String,
    },
    averageprice: {
      type: Number,
    },
    category: 
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "LoisirCategory",
      },
      destination: 
        {
          required: true,
          type: Schema.Types.ObjectId,
          ref: "Destination",
        },
  },
  { timestamps: true }
);

export default model("Loisir", LoisirSchema);
