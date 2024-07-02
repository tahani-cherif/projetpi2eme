import mongoose from "mongoose";
const { Schema, model } = mongoose;
const ActivityCategorySchema = new Schema(
  {
    libelle: {
      type: String,
      required: true,
    },
    
    },
  { timestamps: true }
);

export default model("ActivityCategory", ActivityCategorySchema);