import { prisma } from "../../config/prismaClient.js";
import { AppError } from "../../utils/AppError.js";

type ServiceOrderStatus =
  | "open"
  | "in_progress"
  | "done";

interface CreateServiceOrderData {
  clientId: number;
  device: string;
  issue: string;
  status?: ServiceOrderStatus;
}

interface UpdateServiceOrderData {
  clientId?: number;
  device?: string;
  issue?: string;
  status?: ServiceOrderStatus;
}

export class ServiceOrdersService {
  async getAll() {
    const orders = await prisma.serviceOrder.findMany();

    return orders;
  }

  async getById(id: number) {
    const order = await prisma.serviceOrder.findUnique({
      where: { id },
    });

    if (!order) {
      throw new AppError(
        "Ordem de serviço não encontrada",
        404,
      );
    }

    return order;
  }

  async create(data: CreateServiceOrderData) {
    const client = await prisma.client.findUnique({
      where: {
        id: data.clientId,
      },
    });

    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }

    const order = await prisma.serviceOrder.create({
      data: {
        client_id: data.clientId,
        device: data.device,
        issue: data.issue,
        status: data.status ?? "open",
      },
    });

    return order;
  }

  async update(
    id: number,
    data: UpdateServiceOrderData,
  ) {
    const existingOrder =
      await prisma.serviceOrder.findUnique({
        where: { id },
      });

    if (!existingOrder) {
      throw new AppError(
        "Ordem de serviço não encontrada",
        404,
      );
    }

    if (data.clientId !== undefined) {
      const client = await prisma.client.findUnique({
        where: {
          id: data.clientId,
        },
      });

      if (!client) {
        throw new AppError("Cliente não encontrado", 404);
      }
    }

    const order = await prisma.serviceOrder.update({
  where: { id },
  data: {
    ...(data.clientId !== undefined && {
      client_id: data.clientId,
    }),

    ...(data.device !== undefined && {
      device: data.device,
    }),

    ...(data.issue !== undefined && {
      issue: data.issue,
    }),

    ...(data.status !== undefined && {
      status: data.status,
    }),
  },
});

    return order;
  }

  async delete(id: number) {
    const existingOrder =
      await prisma.serviceOrder.findUnique({
        where: { id },
      });

    if (!existingOrder) {
      throw new AppError(
        "Ordem de serviço não encontrada",
        404,
      );
    }

    await prisma.serviceOrder.delete({
      where: { id },
    });
  }
}