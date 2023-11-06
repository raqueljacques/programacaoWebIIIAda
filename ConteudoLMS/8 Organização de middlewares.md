# Organizando o projeto utilizando ES Modules (import e export)

Durante a modularização de nosso projeto utilizamos o padrão conhecido como `Common JS` para exportar e importar nossos arquivos. Este paradigma é bem conhecido dentro do `Node.js`, sendo considerado seu padrão até a publicação da versão 12LTS da plataforma. A partir desta, o `Node.js` passou a dar suporte a um novo padrão, conhecido como `ES Modules`, que oferece uma nova sintaxe para implementação e novas funcionalidades.

Para habilitar esse padrão em seu código é fácil! Basta adicionar ao arquivo `package.json` do seu projeto uma nova propriedade, seguindo este padrão:

```javascript
"type": "module"
```

Com isto o novo padrão será habilitado, porém atente-se que o `Common JS` não funcionará mais! Isso quer dizer que as linhas de código que utilizam `exports, module.exports` e `require()` quebrarão em sua aplicação!

Aqui aproveitaremos para propor um desafio! Pegue o projeto que você implementou e o refatore completamente para que ele passe a adotar o novo padrão! Será um desafio e tanto, além de fonte de muito aprendizado.

Para facilitar sua vida, recomendamos a leitura do seguinte [material complementar](https://www.freecodecamp.org/news/javascript-es-modules-and-module-bundlers/).

# Middlewares indispensáveis a sua aplicação

Durante o curso, exploramos fundamentalmente a utilização de middlewares em nossas aplicações. Para a construção de APIs, existem algumas particularmente úteis que neste fechamento gostaríamos de citar. Abaixo uma pequena relação das mais importantes que podem ser adotadas por sua aplicação

Middleware| Descrição --------- | ------ pino-http | Utilizado para geração de LOGs de aplicação helmet | Voltado para segurança, ajudar a proteger sua aplicação através de cabeçalhos HTTP cors | Permite que requisições efetuadas fora do domínio principal da aplicação consigam ser finalizados

Estes e outros módulos úteis, podem ser consultados através da documentação oficial do [Express.js](https://expressjs.com/en/resources/middleware.html).

Terminamos! Esperamos que a jornada tenha sido desafiadora e capaz de te preparar para voos ainda mais altos! Lembre-se sempre de estudar e principalmente aplicar os conceitos aqui apresentados, isto com certeza fará uma enorme diferença na sua formação profissional.

# Referências e Materiais Complementares

[The JavaScript Modules Handbook - Em Inglês](https://www.freecodecamp.org/news/javascript-es-modules-and-module-bundlers/)

[ExpressJs - Middlewares](https://expressjs.com/en/resources/middleware.html)
