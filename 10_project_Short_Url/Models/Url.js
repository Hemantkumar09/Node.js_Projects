import mongoose from "mongoose";
import { shortUrl } from "../controllers/url.js";

const UrlSchema = new mongoose.Schema({
    shortCode: String,
    longUrl: String
})

export const Url = mongoose.model("shortUrl", UrlSchema);