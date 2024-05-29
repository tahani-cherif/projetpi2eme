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
      loisir: 
        {
          type: Schema.Types.ObjectId,
          ref: "Loisir",
        },
      
},
{ timestamps: true }
);
export default model("Destination", DestinationSchema);