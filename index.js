import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import User from "./modules/user.js";
import productRouter from "./routes/productRouter.js";

const app = express();
app.use(bodyParser.json());

const mongoUrl = "mongodb+srv://admin:123@cluster0.zn6kp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, {})
const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected to MongoDB");
})

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);

    if (token != null) {
        jwt.verify(token, "secret-key-7777", (error, decoded) => {
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


app.listen(3000, () => { console.log("server is running on port 3000") });


