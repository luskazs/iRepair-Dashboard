import { prisma } from "../../config/prismaClient.js";
import { AppError } from "../../utils/AppError.js";

interface CreateClientData {
  name: string;
  phone: string;
  email: string;
}

interface UpdateClientData {
  name?: string;
  phone?: string;
  email?: string;
}

export class ClientsService {
  async getAll() {
    const clients = await prisma.client.findMany();

    return clients;
  }

  async getById(id: number) {
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }

    return client;
  }

  async create(data: CreateClientData) {
    const client = await prisma.client.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
      },
    });

    return client;
  }

  async update(id: number, data: UpdateClientData) {
    const existingClient = await prisma.client.findUnique({
      where: { id },
    });

    if (!existingClient) {
      throw new AppError("Cliente não encontrado", 404);
    }

    const client = await prisma.client.update({
      where: { id },
      data,
    });

    return client;
  }

  async delete(id: number) {
    const existingClient = await prisma.client.findUnique({
      where: { id },
    });

    if (!existingClient) {
      throw new AppError("Cliente não encontrado", 404);
    }

    await prisma.client.delete({
      where: { id },
    });
  }
}