import express from 'express'
import mongoose from 'mongoose'
import { registerUser } from './controllers/user.js';


const app = express();
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://hemant9451k_db_user:42kGD5AY7secBrfD@nodejsturorial.v3wmlef.mongodb.net/",{
    "dbName": "NodejsTutorial"
}).then(() => console.log("MondoDB Connected...")).catch((err)=> console.log(err))

app.get('/', (req,res) => {
    res.render('index.ejs');
})

app.post("/form-submit", registerUser);

const port = 1000;
app.listen(port, ()=>console.log(`Port is successfully running on ${port}`));