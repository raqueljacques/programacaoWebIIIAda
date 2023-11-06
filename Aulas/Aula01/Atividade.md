**Exercício ou Discussão:**

- Pesquisar sobre a diferença entre API rest e restful
- Pesquisar sobre código de status de respostas e boas praticas para um bom designer de APIs
- Escrever primeira Documentação API
    - Devera documentar API de produtos descrita acima com código de status correto para cada endpoint.
    - LINK editor: https://editor-next.swagger.io/
    - LINK doc: https://swagger.io/docs/specification/basic-structure/

**Respostas sobre o Exercício ou Discussão**

# Diferença entre API rest e restful

"API REST" e "RESTful" são termos frequentemente usados no contexto de serviços web e comunicação entre sistemas. Embora sejam relacionados, eles se referem a conceitos ligeiramente diferentes:

### API REST (Representational State Transfer):

REST é um estilo arquitetônico para projetar sistemas de comunicação entre computadores.  
Uma API REST é uma interface que segue os princípios do REST.
As APIs REST são projetadas em torno de recursos (entidades de dados) que são identificados por URLs.
Elas usam métodos HTTP (GET, POST, PUT, DELETE, etc.) para realizar operações em recursos.  
A representação dos recursos geralmente é feita em formatos como JSON ou XML.  
Uma API REST pode ou não ser RESTful, dependendo de quão bem ela segue os princípios do REST.

### RESTful:

RESTful é um adjetivo usado para descrever uma API que adere rigorosamente aos princípios do REST.  
Isso significa que a API segue as práticas recomendadas do REST, como identificar recursos com URLs, usar os métodos HTTP corretos para operações (GET para leitura, POST para criação, PUT para atualização, DELETE para exclusão), e usar o sistema de estado transferível.  
As APIs RESTful são projetadas de maneira a serem simples, escaláveis e altamente interoperáveis.  
Uma API que é considerada "RESTful" segue as diretrizes do REST de maneira estrita e é considerada bem projetada para interações na web.  
Em resumo, uma API REST é uma interface que segue os princípios do REST, enquanto "RESTful" é um termo usado para descrever uma API que segue rigorosamente esses princípios. No entanto, a distinção nem sempre é rígida na prática, e o grau de conformidade com os princípios do REST pode variar de uma API para outra. O importante é que o design da API seja adequado às necessidades do sistema e dos desenvolvedores que a utilizam.

# Código de status de respostas

**Informativo (1xx) - o servidor recebeu a solicitação e a está processando:**
- 100: Continuar - O servidor recebeu a solicitação e aguarda mais informações.
- 101: Mudando Protocolos - O servidor está mudando os protocolos conforme solicitado na solicitação.

**Confirmação (2xx) - o servidor recebeu a solicitação e enviou de volta a resposta esperada:**
- 200: OK - A solicitação foi bem-sucedida.
- 201: Criado - A solicitação resultou na criação de um novo recurso.
- 204: Sem Conteúdo - A solicitação foi bem-sucedida, mas não há corpo de resposta.

**Redirecionamento (3xx) indica que algo mais precisa ser feito ou precisou ser feito para completar a solicitação:**
- 301: Movido Permanentemente - O recurso foi movido permanentemente para outra URL.
- 302: Encontrado - O recurso foi encontrado temporariamente em outra URL.
- 303: Veja Outro - A resposta à solicitação pode ser encontrada em outra URL após uma solicitação GET.
  
**Erro do Cliente (4xx) indica que a solicitação não pode ser concluída ou contém a sintaxe incorreta:**
- 400: Solicitação Inválida - A solicitação possui sintaxe inválida ou é mal formada.
- 401: Não Autorizado - A autenticação é necessária e falhou ou está ausente.
- 404: Não Encontrado - O recurso solicitado não foi encontrado no servidor.

**Erro no Servidor (5xx) o servidor falhou ao concluir a solicitação:**
- 500: Erro Interno do Servidor - O servidor encontrou uma situação inesperada e não pode atender à solicitação.
- 502: Gateway Ruim - O servidor atuou como um gateway ou proxy e recebeu uma resposta inválida do servidor upstream.
- 503: Serviço Indisponível - O servidor não pode atender à solicitação temporariamente, geralmente devido a sobrecarga ou manutenção.



# Boas praticas para um bom designer de APIs

## 1. Siga os Princípios do REST
   - Projete sua API seguindo os princípios do REST, como identificação de recursos, uso adequado dos métodos HTTP e manipulação de estado transferível.
   
**Princípios do REST**

Os princípios do REST (Representational State Transfer) são um conjunto de diretrizes de design para a criação de sistemas de comunicação baseados na arquitetura REST. Eles foram propostos por Roy Fielding em sua tese de doutorado em 2000 e são amplamente adotados na construção de serviços web e APIs. Os princípios do REST incluem:

### 1.1 Identificação de Recursos:

Tudo em um sistema REST é considerado um recurso, que pode ser um objeto, um serviço ou qualquer coisa que possa ser nomeada. Cada recurso deve ter uma identificação única, geralmente expressa por uma URL.

### 1.2 Manipulação de Recursos por Representações: 

Os recursos são manipulados por meio de representações, que são geralmente em formato JSON, XML, HTML, ou outros formatos. As operações em um recurso são realizadas usando métodos HTTP apropriados, como GET (para leitura), POST (para criação), PUT (para atualização) e DELETE (para exclusão).

### 1.3 Mensagens sem Estado: 

Cada solicitação do cliente para o servidor deve conter todas as informações necessárias para compreender e processar a solicitação. O servidor não mantém informações de estado da sessão entre solicitações do cliente.

### 1.4 Interação com Interfaces Uniformes: 

A comunicação entre clientes e servidores é padronizada e consistente. Isso significa que a API segue convenções e padrões bem definidos, como a utilização de URLs para identificar recursos e a aplicação consistente dos métodos HTTP.

### 1.5 Sistema de Camadas: 

Um sistema REST pode ser composto por várias camadas, com cada camada tendo uma funcionalidade específica. Isso permite a escalabilidade e a flexibilidade do sistema.

### 1.6. Código sob Demanda (Opcional): 


Embora seja opcional, esse princípio permite que os servidores enviem código executável (por exemplo, JavaScript) para ser executado pelos clientes. É menos comum na prática, especialmente em APIs públicas.

### 1.7. Client-Server Separation: 

Clientes e servidores são separados, o que permite que eles evoluam independentemente um do outro. Isso facilita a escalabilidade e a manutenção.

### 1.8.Cacheabilidade: 
 
 As respostas do servidor podem ser armazenadas em cache, o que ajuda a reduzir a carga nos servidores e a melhorar o desempenho.


## 2. Use Nomes de Recursos Descritivos
   - Escolha nomes de recursos descritivos e significativos, que reflitam o propósito do recurso. Use substantivos no plural para identificar coleções.

## 3. Versione sua API
   - Inclua números de versão na URL da API (por exemplo, "/v1/resource") para garantir a compatibilidade com versões futuras.

## 4. Utilize Verbos HTTP apropriadamente
   - Use os verbos HTTP corretos (GET, POST, PUT, DELETE) para ações apropriadas em recursos. Mantenha operações idempotentes sempre que possível.

## 5. Fornecer Respostas Claras
   - Retorne respostas HTTP claras, com códigos de status apropriados e mensagens de erro informativas. Use JSON ou XML para a representação de dados.

## 6. Suporte Autenticação e Autorização
   - Implemente autenticação e autorização de forma segura para proteger sua API contra acesso não autorizado.

## 7. Documentação Abrangente
   - Forneça documentação completa e clara da API, incluindo exemplos de solicitações e respostas, parâmetros aceitos e detalhes sobre autenticação.

## 8. Considere a Paginação
   - Para listagens longas, permita a paginação para evitar sobrecarga de dados. Use parâmetros como "page" e "limit" para controle.

## 9. Trate Erros Adequadamente
   - Desenvolva um sistema consistente de tratamento de erros e forneça informações úteis para os desenvolvedores, incluindo mensagens de erro descritivas.

## 10. Teste Adequadamente
   - Realize testes extensivos da API para garantir seu funcionamento adequado e considere a implementação de testes automatizados.

## 11. Monitoramento e Análise
   - Implemente ferramentas de monitoramento para acompanhar o desempenho da API e identificar possíveis problemas.

## 12. Evite Alterações Quebradoras
   - Evite fazer alterações que quebrem a compatibilidade com versões anteriores da API. Em vez disso, deprecie recursos antigos de forma controlada.

## 13. Pense na Escalabilidade
   - Projete sua API para ser escalável, garantindo que ela possa lidar com um aumento no tráfego e na carga.
