import { Tunnel } from "./src/utils/tunnel-ssh";
import express from "express";
import * as dotenv from "dotenv";
import { uuid } from "./src/utils/uuid";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/get", (req, res) => {
  console.log(req.body);
  res.json({
    hello: "world",
  });
});

app.post("/", (req, res) => {
  const id = uuid();
  res.json({
    id,
    apiKey: process.env.API_KEY,
  });
});

const test = new Tunnel(3000);

const exec = async () => {
  const tunnel = await test.createTunnel();
  console.log(tunnel.url);
};

exec();
app.listen(3000);
