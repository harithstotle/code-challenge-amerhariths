import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../entities/Client";
import { ClientFilters } from "../types/client.types";

export class ClientService {
  private clientRepo = new ClientRepository();

  async createClient(data: Partial<Client>): Promise<Client> {
    if (!data.name || !data.email) {
      throw new Error("Name and email are required");
    }
    return this.clientRepo.create(data);
  }

  async getClients(filters: ClientFilters) {
    return this.clientRepo.findAll(filters);
  }

  async getClientById(id: string): Promise<Client | null> {
    return this.clientRepo.findById(id);
  }

  async updateClient(
    id: string,
    data: Partial<Client>
  ): Promise<Client | null> {
    return this.clientRepo.update(id, data);
  }

  async deleteClient(id: string): Promise<boolean> {
    return this.clientRepo.delete(id);
  }
}
