import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reponseSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
       
       
        status: {
            piece_jointe:String,
            type: String,
            required: true
        },
        
    },
    {
        timestamps: true
    }
);

export default model('reponse', reponseSchema);