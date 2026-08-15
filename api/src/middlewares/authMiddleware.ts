import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token.js";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Token não fornecido",
    });
  }

  try {
    const payload = verifyToken(token);

    req.user = {
      id: payload.id,
      email: payload.email,
    };

    return next();
  } catch {
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
}