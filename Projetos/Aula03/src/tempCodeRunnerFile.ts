import express from "express";
import { productController } from "./factory/product.factory";

const router = express.Router();

router.get(
    "/products",
    productController.getAllProducts.bind(productController)
);

router.get(
    "/products/:id",
    productController.getProductById.bind(productController)
);

export { router };
