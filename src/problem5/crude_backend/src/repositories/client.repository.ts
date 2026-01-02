import { AppDataSource } from "../config/data-source";
import { Client } from "../entities/Client";
import { Repository } from "typeorm";

export class ClientRepository {
  private repo: Repository<Client>;

  constructor() {
    this.repo = AppDataSource.getRepository(Client);
  }

  async create(data: Partial<Client>): Promise<Client> {
    const client = this.repo.create(data);
    return this.repo.save(client);
  }

  async findAll(filters?: Partial<Client>): Promise<Client[]> {
    return this.repo.find({ where: filters });
  }

  async findById(id: string): Promise<Client | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const client = await this.findById(id);
    if (!client) return null;
    Object.assign(client, data);
    return this.repo.save(client);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
