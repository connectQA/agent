import { Sequelize } from "sequelize";
import { config } from "../../../env.config";

export default new Sequelize(config.DB_KEY);
