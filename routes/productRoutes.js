const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct,
    getSingleProduct} = require("../controllers/productController");


const router = express.Router();


router.route("/products").get(getAllProducts);

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct).delete( deleteProduct);

router.route("/products/:id").get(getSingleProduct);

module.exports = router;
