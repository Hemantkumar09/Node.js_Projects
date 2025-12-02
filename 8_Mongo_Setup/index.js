import express from "express"
import mongoose from "mongoose"

const app = express()


mongoose.connect("mongodb+srv://hemant9451k_db_user:42kGD5AY7secBrfD@nodejsturorial.v3wmlef.mongodb.net/", {
    "dbName":"NodejsTutorial"
}).then(()=>console.log("Successfully connected to MongoDB Database")).catch((err) => console.log(err))

const port = 3001
app.listen(port, ()=> console.log(`Port is successfully running on ${port}`))