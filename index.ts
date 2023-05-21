import { Tunnel } from "./src/tunnel/tunnel-ssh";
import express from "express";
import { uuid } from "./src/utils/uuid";
import { TunnelResponse } from "./src/types/tunnel";
import { decrypt, encrypt } from "./src/utils/crypto";
import { config } from "./env.config";
import { Database } from "./src/data/handlers/database";

// Config
const app = express();
const db = new Database();

// Middlewares
app.use(express.json());

// Routes
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
    apiKey: config.API_KEY,
    encrypted: decrypt(req.body.java),
  });
});

// Process
const instance = new Tunnel(config.PORT);

const exec = async (tunnel: Tunnel): Promise<TunnelResponse> => {
  const { url, port } = await tunnel.createTunnel();
  console.log(url);
  await db.createAgent(url);
  return {
    url,
    port,
  };
};

exec(instance);

// Server
app.listen(config.PORT);
