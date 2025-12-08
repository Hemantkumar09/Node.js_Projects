import express from 'express'
import mongoose from 'mongoose';
import multer from "multer";
import path from 'path'
import {registerUserInfo} from './controllers/register.js';
import { UserLogin } from './controllers/login.js';

const app = express();
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://hemant9451k_db_user:42kGD5AY7secBrfD@nodejsturorial.v3wmlef.mongodb.net/",{
    "dbName": "NodejsTutorial"
}).then(() => console.log("MondoDB Connected...")).catch((err)=> console.log(err))

//rendering register page
app.get("/", (req,res)=>{
    res.render("Register.ejs")
})

//rendering login page
app.get("/login-page", (req,res) => {
    res.render("Login.ejs")
})


const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.post('/register', upload.single('file'), registerUserInfo)

app.post('/login', UserLogin);

const port = 2001;
app.listen(port,()=>console.log(`Successfully running on port ${port}`));