# Utilizando o Express para construir uma API de dados

Agora que compreendemos qual é o papel de uma API, vamos nos aprofundar no padrão que adotaremos para construção de nossas aplicações.

Como sabemos, o Express.js possui amplo suporte e permite que diferentes tipos de software sejam desenvolvidos. Isso quer dizer que você pode utilizar o Express.js para construir um site completo, com páginas HTML navegáveis e dados dinâmicos vindos do banco de dados. Outra abordagem muito comum, é desacoplar a interface final do usuário da API que contém os dados da aplicação, esta então será a abordagem que adotaremos neste módulo.

# RESTful APIs

Para forçar a consistência durante a integração de aplicações baseadas no modelo conhecido como CRUD, o padrão RESTful tem como missão normalizar a forma com que as APIs são construídas e consumidas.

Ela combina então a intenção que uma aplicação (client) tenha ao comunicar-se com outra (server), utilizando para isso uma combinação de verbos do protocolo HTTP e um padrão de URIs para as chamadas.

O resultado dessas chamadas é totalmente desacoplado da camada de apresentação, ou seja, geralmente são transmitidos como resultado apenas dados adotando formatos conhecidos como: HTML, XML, plain/text, JSON etc.

Além disso, metadados podem ser transmitidos durante a comunicação e podem ser utilizados para controlar o cache, detectar erros, controlar o acesso e até negociar o formato de representação das informações.

E um ponto importantíssimo, cada iteração com o servidor geralmente adota o processo conhecido como Stateless, ou seja, para obtermos o estado atualizado de uma aplicação precisamos obrigatoriamente realizar uma nova chamada ao servidor.

Costumamos dizer que uma vez que todos os princípios deste padrão sejam adotados durante o desenvolvido, a API segue o padrão RESTful.

# Modelando sua API, utilizando os métodos e retornos do protocolo HTTP

Pensando de forma mais objetiva, imagine que você precisa desenvolver uma aplicação cujo objetivo principal seja manter atualizada uma relação de clientes em sua plataforma. Se você parar para refletir, algumas operações serão necessárias para esse fim, e seu sistema precisará cobrir as seguintes funcionalidades:

Create - criar um cliente;

Retrieve - recuperar um cliente existente;

Update - atualizar os dados de um cliente existente (total ou parcialmente);

Delete - excluir um cliente indesejado.

Uma vez que o seu sistema seja capaz de executar estas operações, podemos dizer que ele é um CRUD.

Na prática, para cada operação prevista em um CRUD existe uma correlação com a utilização do protocolo HTTP. Caso você não saiba, algumas palavrinhas comuns como GET, POST, PUT, PATCH e DELETE representam ações neste protocolo. Para melhor entendimento, observe a tabela a seguir:

```
| CRUD | Ações | HTTP (Verbos / Métodos) | | -------- | --------- | ----------------------- | | Create | Criar | POST | | Retrieve | Recuperar | GET | | Update | Atualizar | PUT / PATCH | | Delete | Excluir | DELETE |
```

Agora se fôssemos modelar nosso sistema, chegaríamos a um desenho em nossa API parecido com o resumo abaixo:

Create - Criar um cliente ➝ POST `/customers/`` ← 201 (Created)

Retrive - Recuperar todos os clientes existentes ➝ GET `/customers/`` ← 200 (OK)

Retrive - Recuperar um cliente específico ➝ GET `/customers/1`` ← 200 (OK)

Update - Atualizar um cliente específico ➝ PUT `/customers/1`` ← 204 (No Content)

Update - Atualizar um cliente específico (parcialmente) ➝ PATCH `/customers/1`` ← 204 (No Content)

Delete - Excluir um cliente específico ➝ DELETE `/customers/1`` ← 204 (No Content)

# Como estruturar os diretórios de uma aplicação REST

Vamos começar a projetar uma API RESTful utilizando o Express.js. Começaremos definindo a estrutura básica de nossa aplicação, utilizando como exemplo a administração de um recurso que cadastra, consulta, atualiza e remove dados de nossos clientes.

A estrutura do projeto deverá seguir o seguinte padrão:

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

Nesta primeira versão, organizaremos o nosso software da forma mais modularizada possível. Para isto, note que criamos um conjunto significativo de pastas. Cada uma delas tem um papel, que vamos descrever a seguir:

`src` - responsável pelo arquivo `app.js` que será o ponto de entrada para execução de nossa aplicação.

`routes` - nesta camada, adicionaremos o `express.Router()` para definir as rotas que manipularão nossos produtos.

`controllers` - pensando na organização, separaremos a lógica da aplicação nesta camada.

`dao` - nesta camada, implementaremos a camada que fará acesso ao nosso sistema de banco de dados.

`infra` - camada destinada a artefatos responsáveis pelo funcionamento de nossa aplicação. Em nosso exemplo ela armazenará uma estrutura de dados utilizando o banco de dados SQLite.

No próximo capítulo, avançaremos implementando cada uma dessas camadas para construirmos nossa aplicação.

# Referências e Materiais Complementares

[REST API Tutorial](https://restfulapi.net/)
