import express from 'express';
import { createOrder, getOrders } from '../controlers/orderController.js';

const orderRouter = express.Router();
orderRouter.get('/', getOrders);
orderRouter.post('/', createOrder);

export default orderRouter;