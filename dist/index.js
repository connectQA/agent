"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const run_instance_1 = require("./src/tunnel/run-instance");
const connectqa_config_1 = require("./connectqa.config");
const tunnel_ssh_1 = require("./src/tunnel/tunnel-ssh");
const routes_1 = require("./src/www/routes/routes");
const logger_1 = require("./src/utils/logger");
const http_1 = require("./src/utils/http");
// Config
const app = (0, express_1.default)();
const proc = new tunnel_ssh_1.Tunnel(connectqa_config_1.config.PORT);
const logger = new logger_1.Log();
const http = new http_1.ConnectQAHTTP();
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
(0, routes_1.routesProvider)(app);
// Process
(0, run_instance_1.runInstance)(proc);
// Server
app.listen(connectqa_config_1.config.PORT, () => {
    logger.info("Configuring listeners for incoming tests...");
});
