import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { config } from 'dotenv'
import userRouter from './Route/user.js'
import productRouter from './Route/product.js'
import cartRouter from './Route/cart.js'


const app = express();
app.use(bodyParser.json());

config({path: '.env'})

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_NAME,{
        "dbName": "NodejsTutorial"
    });
    console.log("Database connected!");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("DB connection error: ", error);
  }
};

startServer();

app.get("/", (req,res) => {
    return res.json({"message" : "home route working..."})
})

app.use('/api/user', userRouter);

app.use('/api/product', productRouter);

app.use('/api/cart', cartRouter);
