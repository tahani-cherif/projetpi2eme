import mongoose from "mongoose";
const { Schema, model } = mongoose;
const typeeventSchema = new Schema(
    
{
        name: {
              type: String,
              required: true,}
            
},
{ timestamps: true }
);
export default model("typevent", typeeventSchema);