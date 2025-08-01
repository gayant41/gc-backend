import Product from "../modules/product.js";
import { isadmin } from "./userControler.js";

export async function getProducts(req, res) {
    Product.find().then((products) => {
        res.json({
            message: "Products found",
            list: products
        });
    })
    // try {
    //     const productsList = await Product.find();
    //     res.json({
    //         message: "Products found",
    //         list: productList
    //     })
    // }
    // catch (error) {
    //     res.json(error)

    // }

}

export function createProduct(req, res) {
    if (!isadmin(req)) {
        res.json({
            message: "Please login as admin to create product"
        });
        return;
    }

    //console.log(req.user);
    if (req.user == null) {
        res.json({
            message: "User not logged in"
        });
        return;
    }
    if (req.user.type !== "admin") {
        res.json({
            message: "User not admin"
        });
        return;
    }

    const product = new Product(req.body);
    product.save()
        .then(() => {
            res.json({
                message: "Product created"
            });
        })
        .catch(() => {
            res.json({
                //message: error.message
                message: "Product not created"
            });
        });
}


export function deleteProduct(req, res) {
    Product.deleteOne({ name: req.params.name }).then(
        () => {
            res.json({
                message: "Product deleted"
            })
        }).catch(
            () => {
                res.json({
                    message: " product not deleted"
                })
            })
}

