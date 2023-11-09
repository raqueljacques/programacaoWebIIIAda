import { Request, Response } from "express";
import { ProductServiceInterface } from "../service/product.service.interface";

export class ProductController {
    private productService: ProductServiceInterface;

    constructor(productService: ProductServiceInterface) {
        this.productService = productService;
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await this.productService.findAll();
            return res.json(products);
        } catch (err) {
            return res.json(err);
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) throw new Error("Id must be a number");
            const products = await this.productService.getProductById(id);
            return res.status(200).json(products);
        } catch (err: any) {
            if (err.message.includes("not found")) {
                return res.status(404).json({ error: err.message });
            } else {
                return res.status(500).json({ error: err.message });
            }
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            const { name, price } = req.body;
            if (!name || !price) {
                throw new Error("Name and price are required");
            }
            const product = await this.productService.createProduct(
                name,
                price
            );
            return res.status(201).json(product);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

    async editProduct(req: Request, res: Response) {
        try {
            const { id, name, price } = req.body;
            if (!id) {
                throw new Error("Id is required");
            }
            const product = await this.productService.editProduct(
                id,
                name,
                price
            );
            return res.status(200).json(product);
        } catch (err: any) {
            if (err.message.includes("not found")) {
                return res.status(404).json({ error: err.message });
            } else {
                return res.status(500).json({ error: err.message });
            }
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) throw new Error("Id must be a number");
            await this.productService.deleteProduct(id);
            return res.status(204).json();
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }
}
