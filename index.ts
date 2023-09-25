import express from "express";
import inquirer, { Answers } from "inquirer";
import { Token } from "./token/index.js";
import { Log } from "./src/utils/logger.js";
import { Tunnel, runInstance } from "./src/tunnel/tunnel-ssh.js";
import { routesProvider } from "./src/www/routes/routes.js";
import { pathExistsOrCreate } from "./src/utils/folder.js";
import { tokenRegister, menu } from "./cli/index.js";
import { config } from "./connectqa.config.js";
import { ConnectQAHTTP } from "./src/www/requests/http.js";

// Config
const app = express();
const proc = new Tunnel(config.PORT.toString());
const logger = new Log();
const tokenValidator = new Token();
const http = new ConnectQAHTTP();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
routesProvider(app);

// Process
pathExistsOrCreate("tmp");

// Run cli
console.clear();
console.log("************** ConnectQA Agent **************");
console.log("An open source no-code automated testing tool.");
console.log("Let's register this machine with your account info.\n");
const { key } = tokenValidator.isTokenDefined();
if (!key) {
  try {
    inquirer.prompt(tokenRegister).then(async ({ accountId, token }) => {
      logger.info("Validating token...", true);
      const response = await http.validateToken(accountId, token);
      if (response) start();
    });
  } catch (error) {
    logger.error(`${error}`);
  }
} else {
  inquirer.prompt(menu).then(({ option }) => {
    switch (option) {
      case 1:
        start();
        break;
      case 2:
        start();
      case 3:
        start();
      default:
        break;
    }
  });
}

const start = () => {
  logger.info("Starting the application...", true);
  runInstance(proc);
  app.listen(config.PORT, () => {
    logger.info("Connection created successfully.", true);
  });
};
