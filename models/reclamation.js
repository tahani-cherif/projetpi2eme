import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reclamationSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
       type: {
            type: String,
            required: true
        },
        
    },
    {
        timestamps: true
    }
);

export default model('Reclamation', reclamationSchema);