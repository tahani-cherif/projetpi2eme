import mongoose from "mongoose";
const { Schema, model } = mongoose;

const typeTransportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("TypeTransport", typeTransportSchema);
