import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import User from "./modules/user.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {})
const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected to MongoDB");
})

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);

    if (token != null) {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (!error) {
                console.log(decoded);
                req.user = decoded;
            }
        })
    }
    next();
})

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);


app.listen(3000, () => { console.log("server is running on port 3000") });


