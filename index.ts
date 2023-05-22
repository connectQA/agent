import { Tunnel } from "./src/tunnel/tunnel-ssh";
import express from "express";
import { TunnelResponse } from "./src/types/tunnel";
import { config } from "./env.config";
import { Database } from "./src/data/handlers/database";
import { routesProvider } from "./src/www/routes/routes";

// Config
const app = express();
const db = new Database();

// Middlewares
app.use(express.json());

// Routes
routesProvider(app);

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
