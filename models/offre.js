import mongoose from "mongoose";
const { Schema, model } = mongoose;
const OffreShema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        dated: {
            type: Date,
            required: true,
        },
        datef: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
        },
        categorie:
        {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "CategorieOffre",
        }
    },
    { timestamps: true }
);

export default model("Offre", OffreShema);
