import express from "express";
import { config } from "./connectqa.config";
import { Tunnel, runInstance } from "./src/tunnel/tunnel-ssh";
import { routesProvider } from "./src/www/routes/routes";
import { Log } from "./src/utils/logger";
import { ConnectQAHTTP } from "./src/utils/http";
import { pathExistsOrCreate } from "./src/utils/folder";

// Config
const app = express();
const proc = new Tunnel(config.PORT.toString());
const logger = new Log();
const http = new ConnectQAHTTP();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
routesProvider(app);

// Process
pathExistsOrCreate("tmp");
runInstance(proc);

// Server
app.listen(config.PORT, () => {
  logger.info("Configuring listeners for incoming tests...", false);
});
