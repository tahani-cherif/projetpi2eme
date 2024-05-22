import mongoose from "mongoose";
const { Schema, model } = mongoose;
const DestinationSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      region: [
        {
          type: Schema.Types.ObjectId,
          ref: "Region",
        },
    ],
},
{ timestamps: true }
);
export default model("Destination", DestinationShema);