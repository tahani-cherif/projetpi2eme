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
      localisation: {
        type: String,
      },
      imageUrl: {
        type: String,
        required: true
      },
      
      
},
{ timestamps: true }
);
export default model("Destination", DestinationSchema);