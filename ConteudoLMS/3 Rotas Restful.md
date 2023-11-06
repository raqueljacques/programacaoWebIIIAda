# Implementando o padrão RESTful no Express

## Instalando dependências e configurando NPM Scripts

Neste módulo, vamos implementar uma API Restful explorando muitos conceitos já abordados nos módulos anteriores. No capítulo anterior, você aprendeu a organizar os diretórios do nosso projeto, criando as pastas com a seguinte estrutura:

```
├── controllers
│   ├── customers.js
├── dao
│   ├── customer.js
├── infra
│   ├── api.db
├── routes
│   ├── customers.js
├── src
│   ├── app.js
├── .env
```

Este será o nosso ponto de partida! Vamos começar instalando no projeto as principais dependências que precisaremos utilizar. Para isto, abra seu terminal e digite o seguinte:

```javascript
$ npm init -y && npm install dotenv express sqlite3 ulid nodemon
```

Após a execução note que foi criado o arquivo `package.json` e as dependências adicionadas a pasta `node_modules`. Agora abra o arquivo `package.json` e ajuste os scripts para inicializarmos nossa aplicação:

```javascript
  "scripts": {
    "dev": "nodemon src/app",
    "start": "node src/app"
  },
```

Feita a configuração inicial, executa sua aplicação rodando no terminal:

```javascript
$ npm run dev
```

Após essa execução você poderá validar que o módulo `nodemon` está em execução, então poderemos focar na construção de nossa aplicação!

## Estruturando nossa aplicação

De forma prática, abra o arquivo app.js. Nele implementaremos a estrutura básica para que nossa aplicação Express.js consiga rodar.

// src/app.js

// Importing Modules
const express = require("express");
const app = express();

// Setting Middlewares

// Routes

// App Startup
app.listen(80, () => console.log(`Server running at port 80...`));
Note que neste ponto, nossa aplicação estará funcional! Você pode validar executando a URL: http://localhost em seu navegador. Porém ainda não configuramos a mesma para a devida execução!

Separando nossas rotas com express.Router()
Retomando um pouco de nosso objetivo primário, implementaremos uma API capaz de gerenciar os customers (clientes) em nossa aplicação. Como queremos implementá-la adotando o padrão REST, começaremos nosso trabalho adicionando um conjunto de rotas para administrarmos este recurso.

Faremos isso da forma mais organizada possível, separando em uma camada específica (modularizando) a definição dessas rotas. Para isso, abra o arquivo disponível em /routes/costumers.js, e adicione a ele o seguinte código:

// routes/costumers.js

const express = require("express");
const router = express.Router();

// Create a resource
router.post("/", (req, res) => res.end(`<< CREATE`));

// Retrieve all resources
router.get("/", (req, res) => res.end(`<< RETRIEVE ALL`));

// Retrieve a resources
router.get("/:id", (req, res) => res.end(`<< RETRIEVE: ${req.params.id}`));

// Update a resource (complete)
router.put("/:id", (req, res) => res.end(`<< UPDATE: ${req.params.id}`));

// Update a resource (partial)
router.patch("/:id", (req, res) => res.end(`<< UPDATE PARTIAL: ${req.params.id}`));

// Delete a resource
router.delete("/:id", (req, res) => res.end(`<< DELETE: ${req.params.id}`));

module.exports = router;
Utilizamos para esta implementação a função interna do Express.js responsável por construir as rotas de nossa aplicação. Note que a forma de implementar é muito semelhante ao que já estudamos, o que muda é que os verbos do HTTP (post, get, put, patch, delete) estão associados ao contexto de router. Como estamos trabalhando de forma modularizada, percebemos que ao final de nossa implementação exportamos o objeto router para que ele possa ser reaproveitado em outro contexto.

Para fazermos a mágica acontecer e validar que estas rotas estão disponíveis, abra novamente o arquivo src/app.js. Nele faremos a importação e consequente configuração para que as rotas definidas estejam disponíveis em nossa aplicação.

```javascript
// src/app.js

// Importing Modules
const express = require("express");
const app = express();

// Setting Middlewares

// Routes
const customers = require("../routes/customers");
app.use("/customers", customers);

// App Startup
app.listen(80, () => console.log(`Server running at port 80...`));
```

Observe que adicionamos um novo trecho de código e nele implementamos o método app.use(). Sua finalidade é definir um contexto para execução de nossas rotas, aproveitando a implementação que importamos da outra camada.

Valide o comportamento, executando chamadas a aplicação, para validar cada uma das rotas implementadas. Você pode fazer isso com facilidade utilizando o terminal e o comando curl ou até mesmo usar algum client visual como o Thunder Client:

```javascript
$ curl -X POST \
    'http://localhost/customers'

# Retorno da Execução
<< CREATE
$ curl -X GET \
    'http://localhost/customers'

# Retorno da Execução
<< RETRIEVE ALL
$ curl -X GET \
    'http://localhost/customers/123'

# Retorno da Execução
<< RETRIEVE: 123
$ curl -X PUT \
    'http://localhost/customers/123'

# Retorno da Execução
<< UPDATE: 123
$ curl -X PATCH \
    'http://localhost/customers/123'

# Retorno da Execução
<< UPDATE PARTIAL: 123
$ curl -X DELETE \
    'http://localhost/customers/123'

# Retorno da Execução
<< DELETE: 123
```

# Referências e Materiais Complementares

[ExpressJs - Router](https://expressjs.com/pt-br/guide/routing.html)
