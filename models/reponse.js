import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const reponseSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
       
        reclamation: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "Reclamation",
          },
        
    },
    {
        timestamps: true
    }
);

export default model('Reponse', reponseSchema);