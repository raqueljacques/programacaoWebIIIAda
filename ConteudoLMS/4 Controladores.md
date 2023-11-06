# Separando as lógicas de negócio com o uso de controllers

Vimos no tópico anterior, como isolar a camada que faz o mapeamento das rotas de nossa aplicação, deixando, portanto, de implementá-la diretamente ao escopo da aplicação principal disponível em `src/app.js`. Neste processo, além de conhecer o `express.Router()` pudemos perceber o quando essa separação pode ser benéfica para evolução de nosso código.

Se pensarmos em papéis, a partir de agora o arquivo `routes/customers.js` é especializado em definir quais rotas estarão disponíveis em nossa API para administrar este recurso. Vale notarmos que implementamos diretamente neste arquivo a chamada para o método `res.end()`, cuja função é encerrar o ciclo básico de comunicação (Request / Response).

Note que com essa estratégia, estamos abrindo caminho para adicionar as chamadas "regras de negócio" diretamente a camada das rotas, o que apesar de funcionar não seria o mais adequado. Para resolvermos este problema, a sugestão é criarmos uma camada específica para isso, que chamaremos então de controller.

Vamos implementar isso! Abra então o arquivo `controllers/customers.js` e nele adicione o seguinte código:

```javascript
// controllers/customers.js

// Create a resource
exports.createOne = (req, res) => res.end(`<< CREATE`);

// Retrieve all resources
exports.getAll = (req, res) => res.end(`<< RETRIEVE ALL`);

// Retrieve a resource
exports.getOne = (req, res) => res.end(`<< RETRIEVE: ${req.params.id}`);

// Update a resource (complete)
exports.changeOne = (req, res) => res.end(`<< UPDATE: ${req.params.id}`);

// Update a resource (partial)
exports.changeOnePartial = (req, res) =>
    res.end(`<< UPDATE PARTIAL: ${req.params.id}`);

// Delete a resource
exports.removeOne = (req, res) => res.end(`<< DELETE: ${req.params.id}`);
```

Perceba no código anterior que adicionamos alguns métodos ao módulo global `exports` do Node.js. O objetivo desta implementação é obtermos a instância de um objeto para acessarmos os mesmos. Vale ressaltar, que essa implementação poderia ter sido feita de inúmeras maneiras, utilizando um `objeto literal` ou até mesmo uma `classe`` com o mesmo objetivo.

Uma vez que temos implementada a camada de controller, vamos ajustar nossas routes para que elas utilizem a nova estrutura. Modifique agora o arquivo `/routes/customers.js`, importando o controller para o seu contexto e mapeando os métodos implementados:

```javascript
// routes/costumers.js

const express = require("express");
const router = express.Router();
const controller = require("../controllers/customers.js");

// Create a resource
router.post("/", controller.createOne);

// Retrieve all resources
router.get("/", controller.getAll);

// Retrieve a resource
router.get("/:id", controller.getOne);

// Update a resource (complete)
router.put("/:id", controller.changeOne);

// Update a resource (partial)
router.patch("/:id", controller.changeOnePartial);

// Delete a resource
router.delete("/:id", controller.removeOne);

module.exports = router;
```

Após efetuar essas mudanças, execute novos testes aos endpoints utilizando o `curl`. Perceba que mesmo com uma nova camada, o comportamento e retornos esperados serão os mesmos!

# Separando o acesso ao banco de dados através do padrão DAO

Com as primeiras camadas da nossa API devidamente estruturadas, chegou a hora de implementar nossa primeira funcionalidade. O objetivo dela será consultar todos os dados relativos a clientes cadastrados em nosso sistema. Neste ponto, talvez você esteja se questionando se não seria melhor construir o mecanismo que faz o cadastro desses clientes, porém optamos por seguir com essa estratégia, já que precisaremos fazer também a preparação da nossa base de dados, então na prática ela já nascerá com algumas informações para esta consulta!

Seguindo o mesmo racional, na camada de controller nós podemos então implementar toda a lógica que faz acesso ao banco de dados e executa uma instrução (SQL) no mesmo. Porém, lembre-se do que estamos pregando desde o princípio: a separação.

Faz bastante sentido, então, pensarmos em como isolar a lógica que conecta e executa instruções no banco de dados em uma camada diferente. É por este motivo que adicionamos ao projeto uma pasta chamada `dao`. A sigla DAO (Data Access Object), nada mais é do que um design pattern de mercado, onde através do uso de uma classe que representa uma determinada entidade, nós modelaremos os comportamentos para criar, consultar, atualizar e excluir os dados em nosso banco.

Começaremos nossa implementação portanto, criando a estrutura desse objeto e adicionando os métodos que utilizaremos em nosso controller. Abra o arquivo `/dao/customer.js` e adicione o seguinte código:

```javascript
// dao/customer.js

class Customer {
    // Create a resource
    save() {}

    // Retrieve all resources
    findAll() {}

    // Retrieve a resource
    findOne() {}

    // Update a resource (complete)
    updateOne() {}

    // Update a resource (partial)
    updateFragment() {}

    // Delete a resource
    deleteOne() {}
}

module.exports = new Customer();
```

Nosso trabalho até este ponto foi apenas definir na classe `Customer`` os métodos que executarão os processos no banco de dados. Vamos aproveitar para refatorar nossa camada de controller, mapeando cada uma dessas ações:

```javascript
// controllers/customers.js
const Customer = require("../dao/customer");

// Create a resource
exports.createOne = (req, res) => {
    Customer.save();
};

// Retrieve all resources
exports.getAll = (req, res) => {
    Customer.findAll();
};

// Retrieve a resource
exports.getOne = (req, res) => {
    Customer.findOne();
};

// Update a resource (complete)
exports.changeOne = (req, res) => {
    Customer.updateOne();
};

// Update a resource (partial)
exports.changeOnePartial = (req, res) => {
    Customer.updateFragment();
};

// Delete a resource
exports.removeOne = (req, res) => {
    Customer.deleteOne();
};
```

Neste ponto, caso você tente executar chamadas aos endpoints da aplicação, perceberá que a conexão não será fechada, pois removemos do código o método `res.end()` que fechava o ciclo de comunicação. O motivo disso, é porque ainda precisamos evoluir nossa estrutura, criando nosso banco de dados e fazendo a conexão do mesmo ao DAO para então executarmos nele as instruções SQL. Este será o próximo ponto que atacaremos, no tópico a seguir.

# Referências e Materiais Complementares

[Express Tutorial Part 4: Routes and controllers](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)
