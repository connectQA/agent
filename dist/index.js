"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const run_1 = require("./src/run/run");
const connectqa_config_1 = require("./connectqa.config");
const tunnel_ssh_1 = require("./src/tunnel/tunnel-ssh");
const routes_1 = require("./src/www/routes/routes");
const logger_1 = require("./src/utils/logger");
const http_1 = require("./src/utils/http");
// Config
const app = (0, express_1.default)();
const proc = new tunnel_ssh_1.Tunnel(connectqa_config_1.config.PORT);
const _logger = new logger_1.Log();
const http = new http_1.ConnectQARequest();
// Middlewares
app.use(express_1.default.json());
// Routes
(0, routes_1.routesProvider)(app);
// Process
(0, run_1.runInstance)(proc);
http.validatingApiKey();
// Server
app.listen(connectqa_config_1.config.PORT, () => {
    _logger.info("Configuring listeners for incoming tests...");
});
