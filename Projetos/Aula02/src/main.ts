import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Db } from "./db/db";

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const swaggerDefinition = require("./swagger");
const options = {
    swaggerDefinition,
    apis: ["main.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 5000;
console.log("port", process.env.PORT);

app.get("/api/produtos", async (req, res) => {
    try {
        const produtos = await Db.find("tabelaProdutos");
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: "erro no servidor" });
    }
});

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
