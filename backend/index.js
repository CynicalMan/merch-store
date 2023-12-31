import dotenv from 'dotenv'
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import productRoutes from "./routes/product.js"
import authRoutes from "./routes/user.js"
import orderRoutes from "./routes/order.js"
import cors from "cors";
import path from "path";
import helmet from "helmet";

dotenv.config()

const app = express();

const PORT = process.env.PORT || 10000;

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors( {
  credentials: true,
} ));
const uploadsDirectory = path.resolve('upload'); 
app.use('/uploads', express.static(uploadsDirectory));
app.use("/product", productRoutes)
app.use("/auth",authRoutes)
app.use("/order",orderRoutes)


mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser : true,
  useUnifiedTopology: true
}).then(()=>{
  app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`);
})
}).catch((err)=>{
  console.log(`${err} didn't connect !`);
})
