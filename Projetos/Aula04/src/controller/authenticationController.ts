import { Request, Response } from "express";
import { randomUUID } from "crypto";

const users: { username: string; password: string; token: string }[] = [];

class UserController {
    static login(req: Request, res: Response): void {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({
                message: "Informe um nome de usuário e senha.",
            });
            return;
        }

        const token = randomUUID();
        const user = { username, password, token };
        users.push(user);

        res.status(200).json({
            message: "Usuário cadastrado com sucesso!",
            user,
        });
    }

    static private(req: Request, res: Response): void {
        const token = req.query.token as string;
        if (!token) {
            res.status(400).json({ message: "Token não fornecido." });
            return;
        }

        const user = users.find((u) => u.token === token);

        if (!user) {
            res.status(401).json({ message: "Acesso negado. Token inválido." });
            return;
        }

        res.status(200).json({ message: "Acesso permitido!", user });
    }
}

export default UserController;
