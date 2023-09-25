import express from "express";
import inquirer from "inquirer";
import { Token } from "./token/index.js";
import { Log } from "./src/utils/logger.js";
import { Tunnel, runInstance } from "./src/tunnel/tunnel-ssh.js";
import { routesProvider } from "./src/www/routes/routes.js";
import { pathExistsOrCreate } from "./src/utils/folder.js";
import { tokenRegister, menu } from "./cli/index.js";
import { config } from "./connectqa.config.js";

// Config
const app = express();
const proc = new Tunnel(config.PORT.toString());
const logger = new Log();
const tokenValidator = new Token();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
routesProvider(app);

// Process
pathExistsOrCreate("tmp");

// Run cli
console.clear();
console.log("***** ConnectQA Agent *****");
const { key } = tokenValidator.isTokenDefined();
if (!key) {
  inquirer.prompt(tokenRegister).then((answers) => {
    runInstance(proc);
    app.listen(config.PORT, () => {
      logger.info("Configuring listeners for incoming tests...", false);
    });
  });
} else {
  inquirer.prompt(menu).then((answers) => {
    runInstance(proc);
    app.listen(config.PORT, () => {
      logger.info("Configuring listeners for incoming tests...", false);
    });
  });
}
