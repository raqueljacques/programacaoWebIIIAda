# Criar uma API RESTful de produtos com operações CRUD (Create, Read, Update e Delete)


Para istalar as dependencias

```javascript
nvm use && npm install
```

Para iniciar o projeto

```javascript
npm run dev
```

**Desafio: API de Gerenciamento de Produtos**

**Requisitos do Sistema:**

1. **Camada de Apresentação (Controller):**
    - Crie um conjunto de rotas para manipular as solicitações HTTP (usando, por exemplo, o Express.js).
    - Implemente endpoints para listar todos os produtos, obter um produto específico, criar um novo produto, atualizar um produto e excluir um produto.
    - Valide os dados de entrada nas rotas, garantindo que sejam seguros e completos.
    - Capture exceção lançada na camada de serviço
2. **Camada de Negócios (Serviços):**
    - Crie classes de serviço que contenham a lógica de negócios para manipular produtos.
    - Use injeção de dependência para garantir que as classes de serviço possam ser facilmente testadas e reutilizadas.
3. **Camada de Acesso a Dados: (Repositorio)**
    - Defina modelos de dados para representar os produtos.
    - Implemente funções para interagir com o banco de dados (classe Db) para executar operações CRUD nas entidades de produto.