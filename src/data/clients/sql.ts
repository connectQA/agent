import { Sequelize } from "sequelize";
import { config } from "../../../connectqa.config";

export default new Sequelize(config.DB_KEY!, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  dialect: "postgres",
  pool: {
    max: 25,
    min: 0,
    idle: 10000,
  },
});
