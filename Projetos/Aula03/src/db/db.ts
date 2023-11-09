import { faker } from "@faker-js/faker";
import { Product } from "../entity";

const db = {
    tabelaProdutos: [] as Product[],
};

export class Db {
    static async create(dados: any) {
        const salvar: Product = {
            ...dados,
            id: faker.number.int({ min: 1, max: 100 }),
            price: Number(dados.price),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        db.tabelaProdutos.push(salvar);
        return Promise.resolve(salvar);
    }

    static async findById(id: number) {
        const product = db.tabelaProdutos.find((product) => product.id == id);
        return Promise.resolve(product);
    }

    static async find() {
        return Promise.resolve(db.tabelaProdutos);
    }

    static async update(id: number, dados: any) {
        const index = db.tabelaProdutos.findIndex(
            (product) => product.id == id
        );
        console.log(index);
        if (index === -1) {
            throw new Error(`Product with id ${id} not found`);
        }

        if (
            db.tabelaProdutos[index].price === dados.price &&
            db.tabelaProdutos[index].name === dados.name
        ) {
            throw new Error(`Product with id ${id} doesn't have any changes`);
        }

        db.tabelaProdutos[index] = {
            ...dados,
            id: Number(id),
            createdAt: db.tabelaProdutos[index].createdAt,
            updatedAt: new Date(),
        };

        console.log(db.tabelaProdutos[index]);
        return Promise.resolve(db.tabelaProdutos[index]);
    }

    static async delete(id: number) {
        const index = db.tabelaProdutos.findIndex(
            (product) => product.id == id
        );
        db.tabelaProdutos.splice(index, 1);
    }
}
