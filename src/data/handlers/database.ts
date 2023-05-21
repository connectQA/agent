import { Sequelize } from "sequelize";
import sqlClient from "../clients/sql";
import { Agent } from "../models/agent";
import { uuid } from "../../utils/uuid";
import { Log } from "../../utils/logger";

export class Database {
  private readonly _db: Sequelize = sqlClient;
  private readonly _logger: Log = new Log();

  public async createAgent(url: string): Promise<boolean> {
    try {
      this._logger.info("Inserting agent to database.");
      await Agent.create({
        id: uuid(),
        url,
      });
      this._logger.info("Agent inserted succesfully.");
      return true;
    } catch (error: any) {
      this._logger.error(error);
      return false;
    }
  }
}
