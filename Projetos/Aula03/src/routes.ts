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

router.post(
    "/products",
    productController.createProduct.bind(productController)
);

router.put("/products", productController.editProduct.bind(productController));

router.delete(
    "/products/:id",
    productController.deleteProduct.bind(productController)
);

export { router };
