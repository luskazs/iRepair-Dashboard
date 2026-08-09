import type { Request, Response } from "express";
import { ServiceOrdersService } from "./service_orders.service.js";
import { AppError } from "../../utils/AppError.js";
const serviceOrdersService = new ServiceOrdersService();

export class ServiceOrdersController {
  async getAll(_req: Request, res: Response) {
    const orders = await serviceOrdersService.getAll();

    return res.status(200).json(orders);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const order = await serviceOrdersService.getById(id);

    return res.status(200).json(order);
  }

  async create(req: Request, res: Response) {
  const {
    clientId,
    device,
    issue,
    status,
  } = req.body;

  if (!clientId || !device || !issue) {
    throw new AppError(
      "Cliente, dispositivo e problema são obrigatórios",
      400,
    );
  }

  const validStatuses = [
    "open",
    "in_progress",
    "done",
  ];

  if (status && !validStatuses.includes(status)) {
    throw new AppError(
      "Status da ordem de serviço inválido",
      400,
    );
  }

  const order = await serviceOrdersService.create({
    clientId,
    device,
    issue,
    status,
  });

  return res.status(201).json(order);
}

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const {
      clientId,
      device,
      issue,
      status,
    } = req.body;

    const order = await serviceOrdersService.update(id, {
      clientId,
      device,
      issue,
      status,
    });

    return res.status(200).json(order);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    await serviceOrdersService.delete(id);

    return res.status(204).send();
  }
}