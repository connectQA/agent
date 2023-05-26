import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  CONNECTQA_SERVER: process.env.CONNECTQA_SERVER,
  SECRET_KEY: process.env.SECRET_KEY,
  API_KEY: process.env.API_KEY,
  AES_KEY: process.env.AES_KEY,
  DB_KEY: process.env.DB_KEY,
  PORT: process.env.PORT,
};
