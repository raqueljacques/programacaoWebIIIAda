import { Product } from "../entity";

export interface ProductServiceInterface {
    findAll(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    createProduct(name: string, price: number): Promise<Product>;
    editProduct(id: number, name: string, price: number): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
}
