import express from "express";
import { runInstance } from "./src/run/run";
import { config } from "./connectqa.config";
import { Tunnel } from "./src/tunnel/tunnel-ssh";
import { routesProvider } from "./src/www/routes/routes";
import { Log } from "./src/utils/logger";
import { ConnectQAHTTP } from "./src/utils/http";

// Config
const app = express();
const proc = new Tunnel(config.PORT);
const _logger = new Log();
const http = new ConnectQAHTTP();

// Middlewares
app.use(express.json());

// Routes
routesProvider(app);

// Process
runInstance(proc);
http.validateApiKey();

// Server
app.listen(config.PORT, () => {
  _logger.info("Configuring listeners for incoming tests...");
});
