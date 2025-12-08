import express from 'express'
import mongoose from 'mongoose';
import { shortUrl, getOriginalUrl } from './controllers/url.js';

const app = express();
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://hemant9451k_db_user:42kGD5AY7secBrfD@nodejsturorial.v3wmlef.mongodb.net/",{
    "dbName": "NodejsTutorial"
}).then(() => console.log("MondoDB Connected...")).catch((err)=> console.log(err))

app.get("/", (req,res)=> {
    res.render('index.ejs', {shortUrl: null})
})

//short url logic
app.post("/short", shortUrl)

//redirect to long Url
app.get("/:shortCode", getOriginalUrl)


const port = 2000;
app.listen(port, () => console.log(`Port is successfully running on ${port}`));