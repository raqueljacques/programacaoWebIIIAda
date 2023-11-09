import { Product } from "../entity";
import { ProductRepositoryInterface } from "../repository/product.repository.interface";

import { ProductServiceInterface } from "./product.service.interface";

export class ProductService implements ProductServiceInterface {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async findAll(): Promise<Product[]> {
        const products = await this.productRepository.findAll();
        if (!products) throw new Error("Not found");
        return products;
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.getProductById(id);
        if (!product) throw new Error("Not found");
        return product;
    }

    async createProduct(name: string, price: number): Promise<Product> {
        const product = await this.productRepository.createProduct(name, price);
        return product;
    }

    async editProduct(
        id: number,
        name: string,
        price: number
    ): Promise<Product> {
        const product = await this.productRepository.editProduct(
            id,
            name,
            price
        );
        return product;
    }

    async deleteProduct(id: number) {
        this.productRepository.deleteProduct(id);
    }
}
