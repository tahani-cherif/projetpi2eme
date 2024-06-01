import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const typeSchema = new Schema(
    {
        libelles: {
            type: String,
            required: true
        },
        
    },
    {
        timestamps: true
    }
);

export default model('Type', typeSchema);
