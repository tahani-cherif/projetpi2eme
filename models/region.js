import mongoose from "mongoose";
const { Schema, model } = mongoose;
const RegionSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      activities: [
        {
          type: Schema.Types.ObjectId,
          ref: "Activity",
        },
      ],
      hotels: [
        {
          type: Schema.Types.ObjectId,
          ref: "Hotel",
        },
      ],
      restaurants: [
        {
          type: Schema.Types.ObjectId,
          ref: "Restaurant",
        },
      ],
    },
    { timestamps: true }
  );
  export default model("Region", RegionShema);