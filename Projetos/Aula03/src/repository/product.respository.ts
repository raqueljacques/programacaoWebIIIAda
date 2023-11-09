import { Db } from "../db/db";
import { ProductRepositoryInterface } from "./product.repository.interface";

export class ProductRepository implements ProductRepositoryInterface {
    async findAll() {
        const products = await Db.find();
        return products;
    }

    async getProductById(id: number) {
        const product = await Db.findById(id);
        if (product === undefined) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    }

    async createProduct(name: string, price: Number) {
        const product = await Db.create({ name, price });
        return product;
    }

    async editProduct(id: number, name: string, price: number) {
        const updateData: { name?: string; price?: number } = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
        if (!name && !price) {
            throw new Error("Name or price must be provided");
        }
        const product = await Db.update(id, { name, price });
        return product;
    }

    async deleteProduct(id: number) {
        await Db.delete(id);
    }
}
