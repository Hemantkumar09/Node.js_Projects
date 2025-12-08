import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';
import { config } from 'dotenv';

const app = express();
app.use(bodyParser.json());

config({path: '.env'})

mongoose.connect(process.env.DB_NAME,{
    "dbName": "NodejsTutorial"
}).then(() => console.log("MondoDB Connected...")).catch((err)=> console.log(err))

//user Route
app.use("/api/user", userRouter);

//contact Route
app.use("/api/contact", contactRouter);

const port = process.env.PORT;
app.listen(port, ()=> console.log(`Successfully running on port ${port}`));