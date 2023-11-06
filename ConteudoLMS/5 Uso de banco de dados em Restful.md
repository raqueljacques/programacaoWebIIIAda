# Preparando nosso banco de dados para integração com o DAO

Antes de prosseguirmos com o código, vamos preparar o banco de dados para conexão. Revisitaremos então o uso do SQLite, um banco de dados pequeno, rápido, independente, confiável e, portanto, completo para o que precisamos.

De acordo com seu sistema operacional, abra o shell do SQLite. Uma vez que você esteja no prompt de comando, execute a seguinte instrução:

```sql
# nos exemplos o termo sqlite> representa o prompt de comando,
# portanto não é necessário digitá-lo!
sqlite> .open banco.db
```

Em seguida, vamos criar a tabela onde armazenaremos as informações. Para isso, execute o seguinte código:

```sql
sqlite> CREATE TABLE customers (
   ...>   id TEXT UNIQUE NOT NULL,
   ...>   name TEXT NOT NULL,
   ...>   email TEXT NOT NULL UNIQUE PRIMARY KEY,
   ...>   birthday TEXT NOT NULL,
   ...>   cpf INTEGER NOT NULL,
   ...>   typeAccount TEXT NOT NULL
   ...> );
```

Para conferir se a tabela foi criada, execute novamente a instrução .tables:

```sql
sqlite> .tables
```

Ela deverá devolver o seguinte resultado:

```sql
sqlite> .tables
customers
```

Então vamos inserir alguns registros na tabela, utilizando o comando INSERT:

```sql
sqlite> INSERT INTO customers (id, name, email, birthday, cpf, typeAccount) VALUES ('ABC123', 'Leonardo Souza', 'leonardo.souza@letscode.com', '08/10/1982', '30356278490', 'PF');

sqlite> INSERT INTO customers (id, name, email, birthday, cpf, typeAccount) VALUES ('ABC456', 'Paulo Pacheco', 'paulo.pacheco@letscode.com', '09/12/1980', '28156278490', 'PF');

sqlite> INSERT INTO customers (id, name, email, birthday, cpf, typeAccount) VALUES ('ABC789', 'Roberta Rocha', 'roberta.rocha@letscode.com', '01/01/1981', '28130348490', 'PF');
```

Após executar estes passos, adicione o arquivo banco.db em uma pasta chamada infra na raiz do projeto:

```
├── infra
│   ├── banco.db
```

# Conectando o DAO ao nosso banco de dados

Agora que temos todos os métodos mapeados e o banco de dados criado, vamos implementar a primeira funcionalidade! Nosso objetivo será invocar a rota `http://localhost/customers` e então retornar todos os clientes cadastrados em nosso banco de dados.

Vamos começar a implementar a camada responsável pela conexão ao banco de dados. Para isso, adicione a pasta infra um novo arquivo chamado dbConn.js, com o seguinte código:

```javascript
const { resolve } = require("path");
const { Database } = require("sqlite3");
const { DATABASE_PATH } = require("dotenv").config().parsed;

module.exports = new Database(resolve(DATABASE_PATH));
```

No código acima, usamos a técnica conhecida como `object destructuring`, onde extraímos dos objetos `path`, `sqlite3` e `dotenv` alguns valores. Para criarmos nossa conexão ao SQLite, criamos um objeto a partir do construtor Database, e através do método `resolve` do módulo `path` conseguimos invocar o caminho para o banco de dados definido na variável de ambiente DATABASE_PATH.

Para que este código funcione corretamente, você não pode se esquecer de adicionar a raiz do seu projeto um arquivo .env com a seguinte chave:

DATABASE_PATH=infra/banco.db
Vamos agora importar a conexão com o banco de dados para o contexto de execução do nosso controller. Precisaremos fazer isso, para poder repassá-lo como parâmetro ao nosso DAO. Abra o arquivo /controllers/customer.js e modifique as 2 primeiras linhas para que ele fique assim:

```javascript
// controllers/customers.js
const dbConn = require("../infra/connection");
const Customer = require("../dao/customer")(dbConn);

// Create a resource
// ... (código omitido)
```

Ao fazer essa mudança, sua aplicação deve entrar em crash. O motivo é que a implementação do nosso DAO não está preparada para receber o parâmetro dbConn, pois originalmente ele retorna um objeto. Nosso objetivo agora então é fazer com que ele se comporte como uma função, recebendo o parâmetro dbConn e repassando-o novamente para o objeto que representa um Customer. Faremos isso dessa forma:

```javascript
// dao/customer.js

class Customer {
    // ... (código omitido)
}

module.exports = (dbConn) => new Customer(dbConn);
```

Com esta mudança, sua aplicação deverá voltar a funcionar! Agora nosso objetivo é conseguir executar um comando SQL e validar que esta integração está correta. Para facilitar nossa implementação, faremos a consulta de todos os clientes de nosso banco de dados, então vamos implementar o método findAll da classe Customer:

Antes de iniciarmos, percebemos que ao instanciar a classe Customer nós enviamos para ela o objeto de conexão ao banco de dados. Porém ele não está sendo aproveitado pela classe. Para que isso funcione, precisamos adicionar um construtor e armazenar o valor recebido em uma propriedade da classe, dessa forma:

```javascript
// dao/customer.js

class Customer {
    constructor(db) {
        this.db = db;
    }

    // Create a resource
    // ... (código omitido)
}
```

module.exports = (dbConn) => new Customer(dbConn);
E finalmente, no mesmo código vamos adicionar a execução do código SQL que fará a consulta:

```javascript
// dao/customer.js

class Customer {
    constructor(db) {
        this.db = db;
    }

    // Create a resource
    save() {}

    // Retrieve all resources
    findAll() {
        const sql = `SELECT * FROM customers`;

        this.db.all(sql, (err, data) => {
            console.log(err, data);
        });
    }
}
```

Para validar se estamos conseguindo acessar os dados de nossos clientes, faça uma chamada a aplicação utilizando:

```javascript
$ curl -X GET \
    'http://localhost/customers'
```

Como resultado, você deverá ver no console os dados que foram previamente cadastrados em nosso banco:

```javascript
[
    {
        id: "ABC123",
        name: "Leonardo Souza",
        email: "leonardo.souza@letscode.com",
        birthday: "08/10/1982",
        cpf: 30356278490,
        typeAccount: "PF",
    },
    {
        id: "ABC456",
        name: "Paulo Pacheco",
        email: "paulo.pacheco@letscode.com",
        birthday: "09/12/1980",
        cpf: 28156278490,
        typeAccount: "PF",
    },
    {
        id: "ABC789",
        name: "Roberta Rocha",
        email: "roberta.rocha@letscode.com",
        birthday: "01/01/1981",
        cpf: 28130348490,
        typeAccount: "PF",
    },
];
```

# Referências e Materiais Complementares

[SQLite Tutorial](https://www.sqlitetutorial.net/)
