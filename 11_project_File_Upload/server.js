import express from "express";
import mongoose, { Mongoose } from "mongoose";
import { uploadImage } from "./controllers/uploadImage.js";
import multer from "multer";
import path from 'path'

const app = express();

mongoose.connect("mongodb+srv://hemant9451k_db_user:42kGD5AY7secBrfD@nodejsturorial.v3wmlef.mongodb.net/",{
    "dbName": "NodejsTutorial"
}).then(() => console.log("MondoDB Connected...")).catch((err)=> console.log(err))

app.get("/", (req, res) => {
    res.render("index.ejs", {url:null});
})

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), uploadImage)

const port = 2001;
app.listen(port,()=>console.log(`Sucessfully running on port ${port}`));