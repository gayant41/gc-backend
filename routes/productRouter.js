import express from "express";
import { getProducts } from "../controlers/productControler.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);

export default productRouter;
