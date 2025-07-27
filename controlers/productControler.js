import Product from "../modules/product.js";

export function getProducts(req, res) {
    Product.find().then(
        (productList) => {
            res.json({
                list: productList
            })
        }
    ).catch(
        () => {
            res.json({
                message: "Products not found"
            })
        }
    )
}

export function createProduct(req, res) {

    console.log(req.user)
    if (req.user == null) {
        res.json({
            message: "User not logged in"
        })
        return
    }
    if (req.user.type != "admin") {
        res.json({
            message: "User not admin"
        })
        return
    }


    const product = new Product(req.body);
    product.save().then(
        () => {
            res.json({
                message: "Product created"
            })
        }).catch(
            () => {
                res.json({
                    message: "Product not created"
                })
            })
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

