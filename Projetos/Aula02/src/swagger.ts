const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API de Produtos",
        description: "Uma API para gerenciar produtos.",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor de produção",
        },
    ],
    paths: {
        "/api/produtos": {
            get: {
                summary: "Lista todos os produtos.",
                responses: {
                    "200": {
                        description: "Lista de produtos",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Produto",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Produtos não encontrados",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Erro interno do servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: "Cria um novo produto.",
                requestBody: {
                    description: "Dados do produto a ser criado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/NovoProduto",
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Produto criado com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        code: {
                                            type: "string",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                    },
                                    required: ["code", "message"],
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Solicitação inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Erro interno do servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/produtos/{id}": {
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do produto",
                    required: true,
                    schema: {
                        type: "integer",
                    },
                },
            ],
            get: {
                summary: "Recupera detalhes de um produto específico por ID.",
                responses: {
                    "200": {
                        description: "Detalhes do produto",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Produto",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Produto não encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Erro interno do servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                },
            },
            put: {
                summary: "Atualiza os detalhes de um produto existente.",
                requestBody: {
                    description: "Dados do produto a ser atualizado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AtualizaProduto",
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Produto atualizado com sucesso",
                    },
                    "404": {
                        description: "Produto não encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Erro interno do servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: "Exclui um produto existente.",
                responses: {
                    "204": {
                        description: "Produto excluído com sucesso",
                    },
                    "404": {
                        description: "Produto não encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Erro interno do servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            Produto: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                    },
                    nome: {
                        type: "string",
                    },
                    descricao: {
                        type: "string",
                    },
                    preco: {
                        type: "number",
                    },
                    estoque: {
                        type: "integer",
                    },
                },
                required: ["id"],
            },
            NovoProduto: {
                type: "object",
                properties: {
                    nome: {
                        type: "string",
                    },
                    descricao: {
                        type: "string",
                    },
                    preco: {
                        type: "number",
                    },
                    estoque: {
                        type: "integer",
                    },
                },
            },
            AtualizaProduto: {
                type: "object",
                properties: {
                    nome: {
                        type: "string",
                    },
                    descricao: {
                        type: "string",
                    },
                    preco: {
                        type: "number",
                    },
                    estoque: {
                        type: "integer",
                    },
                },
            },
            Error: {
                type: "object",
                properties: {
                    code: {
                        type: "string",
                    },
                    message: {
                        type: "string",
                    },
                },
                required: ["code", "message"],
            },
        },
    },
};

module.exports = swaggerDefinition;
