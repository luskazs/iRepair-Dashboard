import bcrypt from "bcrypt";
import { prisma } from "../../config/prismaClient.js";
import { generateToken } from "../../utils/token.js";
import { AppError } from "../../utils/AppError.js";

const SALT_ROUNDS = 10;

export class AuthService {
  async register(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("E-mail já cadastrado", 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}