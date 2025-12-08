import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    filename: String,
    public_id: String,
    imgUrl: String
})

export const UserInfo = mongoose.model("UserInfo", userSchema);