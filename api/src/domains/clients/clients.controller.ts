import type { Request, Response } from "express";
import { ClientsService } from "./clients.service.js";
import { AppError } from "../../utils/AppError.js";
const clientsService = new ClientsService();

export class ClientsController {
  async getAll(_req: Request, res: Response) {
    const clients = await clientsService.getAll();

    return res.status(200).json(clients);
  }

  async getById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("ID de cliente inválido", 400);
  }

  const client = await clientsService.getById(id);

  return res.status(200).json(client);
}

  async create(req: Request, res: Response) {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    throw new AppError(
      "Nome, telefone e e-mail são obrigatórios",
      400,
    );
  }

  const client = await clientsService.create({
    name,
    phone,
    email,
  });

  return res.status(201).json(client);
}

  async update(req: Request, res: Response) {
    
    const id = Number(req.params.id);
    const { name, phone, email } = req.body;

    const client = await clientsService.update(id, {
      name,
      phone,
      email,
    });

    return res.status(200).json(client);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
  throw new AppError("ID de cliente inválido", 400);
}

    await clientsService.delete(id);
    return res.status(204).send();
  }
}