import Order from "../modules/order.js";
import { iscustomer } from "./userControler.js";
import Product from "../modules/product.js";

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
        const newProductArray = []

        for (let i = 0; i < newOrderData.orderedItems.length; i++) {
            const product = await Product.findOne({ productId: newOrderData.orderedItems[i].productId });

            if (product == null) {
                res.json({
                    message: "Product not found"
                })
                return
            }
            newProductArray.push({
                name: product.productName,
                quantity: newOrderData.orderedItems[i].quantity,
                price: product.price,
                image: product.image
            })
        }
        newOrderData.orderedItems = newProductArray

        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;
        const newOrder = new Order(newOrderData);
        await newOrder.save();
        res.json({
            message: "Order created",
        })





    } catch (error) {
        res.json({
            message: "Error creating order",
            message: error.message
        })

    }
}

export async function getOrders(req, res) {
    try {
        const orders = await Order.find({ email: req.user.email });
        res.json({
            message: "Orders found",
            list: orders
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}