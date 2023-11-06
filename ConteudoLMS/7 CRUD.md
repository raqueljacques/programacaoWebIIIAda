# Implementando o DAO para cadastrar um novo cliente

Agora que concluímos as consultas, vamos avançar implementando a camada que registrará um cliente em nosso banco de dados. Novamente, vamos começar pelo DAO, implementando o método `save()`:

```javascript
// dao/customer.js
const ULID = require("ulid");

class Customer {
    // ... (código omitido)

    // Create a resource
    save(body, callback) {
        const { name, email, birthday, cpf, typeAccount } = body;
        const ulid = ULID.ulid();
        const sql = `INSERT INTO customers (id, name, email, birthday, cpf, typeAccount) VALUES(?, ?, ?, ?, ?, ?);`;
        this.db.run(
            sql,
            [ulid, name, email, birthday, cpf, typeAccount],
            callback.bind(this, ulid)
        );
    }

    // ... (código omitido)
}
```

Ao implementar o método `save()`, note que adicionamos um novo parâmetro chamado `body`. O objetivo é que ele receba os dados enviados no corpo de nossa requisição (body request). Como novidade, para gerarmos os identificadores únicos de cada registro recorremos a utilização do módulo `ulid`, portanto, não esqueça de instalá-lo! Observe também que ocorreu uma mudança na implementação de nosso `callback`, pois ele ganhou em seu contexto a execução do método `.bind()`. A ideia aqui é conseguir devolver ao contexto de execução o `ulid` gerado internamente no método `save()`.

Vamos alterar o controller para fecharmos nossa implementação:

```javascript
// controllers/customers.js
const dbConn = require("../infra/connection");
const Customer = require("../dao/customer")(dbConn);

// Create a resource
exports.createOne = (req, res) => {
    Customer.save(req.body, (id, err) => {
        if (err) {
            res.status(500).json({ msg: err });
        } else {
            res.status(201).json({ id, ...req.body });
        }
    });
};
```

No código anterior, mantemos o mesmo padrão, em caso de erro emitiremos um `500 (Internal Server Error)` e caso os dados sejam definitivamente salvos no banco, retornaremos um `201 Created`.

# Atualizando e excluindo dados dos clientes

Daqui para frente, todos os nossos exemplos serão bastante semelhantes. Conceitualmente o que já vimos é o suficiente para que você possa implementá-los com segurança. Então vamos deixar aqui apenas as referências das mudanças do DAO e do controller.

Para atualizar os registros dos clientes, implemente o código abaixo:

```javascript
// dao/customer.js
const ULID = require("ulid");

class Customer {
    // ... (código omitido)

    // Update a resource (complete)
    updateOne(body, callback) {
        const { id, name, email, birthday, cpf, typeAccount } = body;

        const sql = `UPDATE customers SET
                    name = ?,
                    email = ?,
                    birthday = ?,
                    cpf = ?,
                    typeAccount = ?
                 WHERE
                    id = ?;`;

        this.db.run(sql, callback);
    }

    // ... (código omitido)
}
```

```javascript
// controllers/customers.js
const dbConn = require("../infra/connection");
const Customer = require("../dao/customer")(dbConn);

// Update a resource (complete)
exports.changeOne = (req, res) => {
    const data = { id: req.params.id, ...req.body };

    Customer.updateComplete(data, (err) => {
        if (err) {
            res.status(500).json({ msg: err });
        } else {
            res.status(204).end();
        }
    });
};
```

Agora para excluir os registros, implemente o seguinte código:

```javascript
// dao/customer.js
const ULID = require("ulid");

class Customer {
    // ... (código omitido)

    // Delete a resource
    deleteOne(id, callback) {
        const sql = `DELETE FROM customers WHERE id = ?`;
        this.db.run(sql, callback);
    }

    // ... (código omitido)
}
```

```javascript
// controllers/customers.js
const dbConn = require("../infra/connection");
const Customer = require("../dao/customer")(dbConn);

// Delete a resource
exports.removeOne = (req, res) => {
    const { id } = req.params;

    Customer.deleteOne(id, (err) => {
        if (err) {
            res.status(500).json({ msg: err });
        } else {
            res.status(204).end();
        }
    });
};
```

Ufa! Se você chegou até aqui, sua primeira API Restful foi implementada! :)

Referências e Materiais Complementares
[SQLite Tutorial](https://www.sqlitetutorial.net/)
