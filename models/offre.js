import mongoose from "mongoose";
const { Schema, model } = mongoose;
const OffreShema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        Dtedebut: {
            type: Date,
            required: true,
        },
        Dtefin: {
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
            ref: "CAT",
        }
    },
    { timestamps: true }
);

export default model("Offre", OffreShema);
