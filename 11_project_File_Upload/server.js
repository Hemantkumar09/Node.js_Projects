import express from "express";
import mongoose, { Mongoose } from "mongoose";
import { uploadImage } from "./controllers/uploadImage.js";
import multer from "multer";
import path from 'path'


const app = express();
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
        cloud_name: 'dhuaumafl', 
        api_key: '617585827482663', 
        api_secret: 'FwA-gvvsswjj7IFdDr6msMEx1XI' 
    });

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

const ImageSchema = new mongoose.Schema({
    filename: String,
    public_id: String,
    imageUrl: String
})

const ImageFile = mongoose.model("ImageUpload", ImageSchema);

app.post('/upload', upload.single('file'), async (req, res, next) => {
  const file = req.file.path
  const cloudinaryRes = await cloudinary.uploader.upload(file,{
    folder:"Node.js_Project_File_Upload"
  });

  //save in DB
  const dbSave = await ImageFile.create({
    filename: file.originalname,
    public_id: cloudinaryRes.public_id,
    imageUrl: cloudinaryRes.secure_url
  }) 

  res.render("index.ejs", {url: cloudinaryRes.secure_url});
//   res.json({
//     message: "File uploaded successfully",
//     cloudinaryRes: cloudinaryRes
//   });
})


const port = 2001;

app.listen(port,()=>console.log(`Sucessfully running on port ${port}`));