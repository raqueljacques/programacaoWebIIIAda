import { faker } from "@faker-js/faker"
import { Db } from "./db/db"



Array.from({ length: 10 }).forEach(async () => {
    const salvar = {
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price({ min: 100, max: 200 })),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
    }
    await Db.create(salvar)

})
