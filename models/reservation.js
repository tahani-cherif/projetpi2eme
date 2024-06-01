import mongoose from "mongoose";
const { Schema, model } = mongoose;
const reservationSchema = new Schema(
    
{
        name: {
              type: String,
              required: true,},
      event : { 
            type : Schema.Types.ObjectId, ref:"Event"
      },
      
            
},
{ timestamps: true }
);
export default model("reservation", reservationSchema);