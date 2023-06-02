import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  API_KEY: process.env.API_KEY,
  CONNECTQA_SERVER:
    "https://a8c2a88c-1faf-43da-a121-3a1a3ac46e4b.mock.pstmn.io",
  PORT: 3200,
};
