import { DataTypes } from "sequelize";
import sqlClient from "../clients/sql";

export const Agent = sqlClient.define(
  "agents",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    updatedAt: false,
  }
);
