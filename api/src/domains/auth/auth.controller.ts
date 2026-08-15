import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { AppError } from "../../utils/AppError.js";
const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      "E-mail e senha são obrigatórios",
      400,
    );
  }

  const user = await authService.register(email, password);

  return res.status(201).json(user);
}

async login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      "E-mail e senha são obrigatórios",
      400,
    );
  }

  const { token, user } = await authService.login(
    email,
    password,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({
    user,
  });
}

  async logout(_req: Request, res: Response) {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout realizado com sucesso",
    });
  }

  async me(req: Request, res: Response) {
    return res.status(200).json({
      user: req.user,
    });
  }
}