import Order from "../modules/order.js";
import { iscustomer } from "./userControler.js";

export async function createOrder(req, res) {
    if (!iscustomer(req)) {
        res.json({
            message: "Please login as customer to create order"
        })
        return;
    }

    try {
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

        let orderId
        if (latestOrder.length == 0) {
            orderId = "GC0001"
        } else {
            const currentOrderId = latestOrder[0].orderId;

            const numberString = currentOrderId.replace("GC", "");
            const number = parseInt(numberString) + 1;
            orderId = "GC" + number.toString().padStart(4, "0");
        }

        const newOrderData = req.body;
        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;
        const newOrder = new Order(newOrderData);
        await newOrder.save();
        res.json({
            message: "Order created",
            order: newOrder
        })



    } catch (error) {
        res.json({
            message: error.message
        })

    }


}