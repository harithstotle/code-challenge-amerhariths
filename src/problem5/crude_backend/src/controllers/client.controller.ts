import { Request, Response } from "express";
import { ClientService } from "../services/client.service";

const clientService = new ClientService();

export class ClientController {
  static async create(req: Request, res: Response) {
    try {
      const client = await clientService.createClient(req.body);
      res.status(201).json(client);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    const filters = req.query;
    const clients = await clientService.getClients(filters as any);
    res.json(clients);
  }

  static async get(req: Request, res: Response) {
    const client = await clientService.getClientById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  }

  static async update(req: Request, res: Response) {
    const client = await clientService.updateClient(req.params.id, req.body);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  }

  static async delete(req: Request, res: Response) {
    const success = await clientService.deleteClient(req.params.id);
    if (!success) return res.status(404).json({ error: "Client not found" });
    res.status(204).send();
  }
}
