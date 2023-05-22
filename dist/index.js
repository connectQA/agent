"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tunnel_ssh_1 = require("./src/tunnel/tunnel-ssh");
const express_1 = __importDefault(require("express"));
const env_config_1 = require("./env.config");
const database_1 = require("./src/data/handlers/database");
const routes_1 = require("./src/www/routes/routes");
// Config
const app = (0, express_1.default)();
const db = new database_1.Database();
// Middlewares
app.use(express_1.default.json());
// Routes
(0, routes_1.routesProvider)(app);
// Process
const instance = new tunnel_ssh_1.Tunnel(env_config_1.config.PORT);
const exec = (tunnel) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, port } = yield tunnel.createTunnel();
    console.log(url);
    yield db.createAgent(url);
    return {
        url,
        port,
    };
});
exec(instance);
// Server
app.listen(env_config_1.config.PORT);
