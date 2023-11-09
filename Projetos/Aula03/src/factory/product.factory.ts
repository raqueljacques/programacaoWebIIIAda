import { ProductController } from "../controller/product.controller"
import { ProductService } from "../service/product.service"
import { ProductRepository } from "../repository/product.respository"

const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

export { productController }