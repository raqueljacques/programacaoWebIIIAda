import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";

const { API_PORT, API_HOST } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(API_PORT, () => {
    console.log(`Server started ${API_HOST}:${API_PORT}`);
});
