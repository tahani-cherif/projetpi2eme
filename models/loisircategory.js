import mongoose from "mongoose";
const { Schema, model } = mongoose;
const LoisirCategorySchema = new Schema(
  {
    libelle: {
      type: String,
      required: true,
    },
    
    },
  { timestamps: true }
);

export default model("LoisirCategory", LoisirCategorySchema);