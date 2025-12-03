import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    filename: String,
    public_id: String,
    imageUrl: String
})


export const ImageFile = mongoose.model("ImageUpload", ImageSchema);