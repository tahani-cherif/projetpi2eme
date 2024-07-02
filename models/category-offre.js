import mongoose from "mongoose";
const { Schema, model } = mongoose;
const OffrecatShema = new Schema(
    {
        type: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export default model("CategorieOffre", OffrecatShema);
