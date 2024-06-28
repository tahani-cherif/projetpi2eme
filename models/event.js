import mongoose, { SchemaType } from "mongoose";
const { Schema, model } = mongoose;
const eventSchema = new Schema(
  {
    description: {
      type: String,
    },
    StartDate:
    {
      type: Date

    },
    EndDate: {
      type: Date,
    },
    Name: {
      type: String,
    },
    image: [{
      type: String,
    }],
    typevent: {
      type: Schema.Types.ObjectId,
      ref: "typevent"
    },
    nmbr: {
      type: Number,
    },
    nmbrReservation: {
      type: Number,
      default:0
    }
  },
  { timestamps: true }
);
export default model("Event", eventSchema);