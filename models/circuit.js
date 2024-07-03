import mongoose from "mongoose";
const { Schema, model } = mongoose;

const circuitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duree: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    images: [String],
    station: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Station",
    },
    loisir: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Loisir",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Circuit", circuitSchema);
