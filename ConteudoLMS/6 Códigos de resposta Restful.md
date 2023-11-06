# Retornando como resposta os dados obtidos pelo DAO

Estamos quase lá! Já conseguimos separar bem as camadas de nossa aplicação, criamos nosso banco de dados, fizemos a conexão e executamos o primeiro comando SQL para consulta das informações, porém perceba que a aplicação ainda não tem o comportamento desejado, pois ela não traz como resposta da nossa requisição os dados consultados. Um agravante, nossa aplicação está travada, ela não consegue sequer fechar o ciclo de comunicação (Request / Response).

A última etapa da nossa implementação visa então mitigar este ponto! Precisamos retornar os dados ao client que nos solicitou, e para isso teremos que implementar pequenas mudanças tanto no DAO, quanto no controller.

A primeira grande sacada, é que precisamos utilizar o objeto `res` para retornar o `json` de nossa aplicação. Porém olhando no código, você perceberá que o nosso DAO não tem acesso aos objetos de req e res. Perceba também que na realidade estes objetos estão em outra camada, que em nosso caso é o controller, então nosso desafio é utilizar o objeto req para devolver uma resposta baseada nos dados obtidos em nosso DAO.

Para clarificar, vamos dar uma olhada no método `findAll()` novamente:

```javascript
// dao/customer.js

class Customer {
    // ... (código omitido)

    // Retrieve all resources
    findAll() {
        const sql = `SELECT * FROM customers`;

        this.db.all(sql, (err, data) => {
            console.log(err, data);
        });
    }
}
```

Perceba que o método `db.all()` recebe como primeiro parâmetro uma string SQL, e no segundo parâmetro é registrado um `callback` para execução. Observando o callback, perceba que ele também recebe 2 parâmetros, um contendo um objeto de `err` (erro) e outro contendo o `data` (dados) que retornaram do banco.

É justamente neste ponto que precisaríamos implementar o método `res.json()`, porém lembre-se que o objeto `res` não está disponível neste contexto. O truque então, será mover este código para o contexto do controller, injetando-o como parâmetro para execução no contexto de nosso DAO. Eis aqui a aplicação prática para o uso de um `callback`. Vamos alterar o código:

```javascript
// dao/customer.js

class Customer {
    // ... (código omitido)

    // Retrieve all resources
    findAll(callback) {
        const sql = `SELECT * FROM customers`;

        this.db.all(sql, callback);
    }
}
```

Perceba que removemos a implementação que tem acesso aos objetos de `err` e `data` e no lugar dela registramos um parâmetro chamado `callback`. Note também que ele chegará através da mudança da assinatura do método `findAll()`, que agora passou a receber este callback, ficando assim: `findAll(callback)`.

Para fechar as pontas, vamos retornar ao controller e nele implementar a função para ser executada internamente pelo DAO:

```javascript
// controllers/customers.js
const dbConn = require("../infra/connection");
const Customer = require("../dao/customer")(dbConn);

// Create a resource
// ... (código omitido)

// Retrieve all resources
exports.getAll = (req, res) => {
    const callback = (err, data) => {
        if (err) {
            res.json({ msg: err });
        } else {
            res.json(data);
        }
    };

    Customer.findAll(callback);
};
```

Observe que dentro do método `exports.getAll()` nós implementamos uma constante chamada `callback`, que nada mais é que função que extraímos do DAO. A novidade aqui, foi que adicionamos um critério, onde se durante a execução do `callback` um `err` existir, uma mensagem contendo o erro será retornada, caso contrário os dados consultados no banco é que retornarão! Na sequência, passamos essa constante para o método `Customer.findAll()` e "vuola", nossa aplicação está funcionando!

Faça um teste executando:

```javascript
$ curl -X GET \
    'http://localhost/customers'
```

Os dados agora deverão ser retornados, ao invés de no console, no corpo de nossa requisição! :)

Ajustando o código de status das respostas
Agora que praticamente concluímos a integração, um ponto final ainda precisa ser explorado! Sempre que fizermos uma consulta ao banco de dados, existirá a possibilidade de os dados não retornarem. Até aí tudo bem, pois nossa aplicação conta com um objeto `err` (erro) que detêm esse comportamento, mas hoje nosso código mesmo que caísse nesse cenário, emitiria como resposta um objeto contendo a mensagem do erro e um código de status `200 (OK)`.

Geralmente, adotamos o HTTP Status Code `200 (OK)` para situações em que a consulta foi realizada com sucesso! Caso o objeto `err` seja populado, a idéia aqui é que algo de errado ocorreu do lado do servidor durante a execução da consulta SQL, então a melhor abordagem seria retornar o HTTP Status `Code 500 (Internal Server Error)`.

Precisamos então rever nossa implementação, para garantir que isso esteja devidamente implementado. Então abra o arquivo /controllers/customers.js e no objeto onde está implementado o método `res.json()` adicione o seguinte código:

```javascript
// controllers/customers.js
const dbConn = require("../infra/connection");
const Customer = require("../dao/customer")(dbConn);

// Create a resource
// ... (código omitido)

// Retrieve all resources
exports.getAll = (req, res) => {
    const callback = (err, data) => {
        if (err) {
            res.status(500).json({ msg: err });
        } else {
            res.status(200).json(data);
        }
    };

    Customer.findAll(callback);
};
```

Desta maneira, caso uma consulta não encontre resultados, o HTTP Status Code correto será retornado!

# Implementando o DAO para consultar um único cliente

Agora que somos capazes de buscar todos os clientes em nosso banco de dados, precisamos evoluir a construção de nossa aplicação implementando os demais métodos de nosso DAO. Vamos começar implementando uma variação do que acabamos de construir, ou seja, ao invés de buscarmos todos os registros de clientes, vamos buscar um único registro. Abra o arquivo `/dao/customer.js` para implementarmos o método `findOne()`:

```javascript
// dao/customer.js

class Customer {
    // ... (código omitido)

    // Retrieve a resource
    findOne(id, callback) {
        const sql = `SELECT * FROM customers WHERE id=?;`;
        this.db.all(sql, [id], callback);
    }

    // ... (código omitido)
}
```

Observe que nessa implementação receberemos 2 parâmetros. No primeiro, enviaremos ao sistema o id de nosso cliente para que ele seja localizado no banco. Perceba que a mesma informação foi passada com parâmetro para o método `db.all()`. Para que esta rota funcione adequadamente, basta modificarmos a camada de controller, desta maneira:

```javascript
// controllers/customers.js
const dbConn = require("../infra/connection");
const Customer = require("../dao/customer")(dbConn);

// Create a resource
// ... (código omitido)

// Retrieve a resource
exports.getOne = (req, res) => {
    const { id } = req.params;

    const callback = (err, data) => {
        if (err) {
            res.status(500).json({ msg: err });
        } else if (data.length) {
            res.status(200).json(data[0]);
        } else {
            res.status(404).json({ msg: `customer not found` });
        }
    };

    Customer.findOne(id, callback);
};
```

No código anterior, temos como novidade a obtenção do parâmetro `id`, que será enviado como um parâmetro na rota de nossa aplicação. E implementamos nosso `callback` adicionando 3 lógicas, onde:

a primeira verifica se ocorreu um erro, retornado um `500 (Internal Server Error)`
a segunda garante que existem registros, retornando um `200 (OK)`
e caso contrário, é retornado um `404 (Not Found)`, uma vez que não foram encontrados registros na consulta
Faça seus testes, executando:

```javascript
$ curl -X GET \
    'http://localhost/customers/ABC123'
```

Se tudo funcionar como o esperado, você obterá o seguinte retorno:

```javascript
{
    id: 'ABC123',
    name: 'Leonardo Souza',
    email: 'leonardo.souza@letscode.com',
    birthday: '08/10/1982',
    cpf: 30356278490,
    typeAccount: 'PF'
}
```

# Referências e Materiais Complementares

[Http Status Code](https://restfulapi.net/http-status-codes/)

[SQLite Tutorial](https://www.sqlitetutorial.net/)
