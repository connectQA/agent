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
const uuid_1 = require("./src/utils/uuid");
const crypto_1 = require("./src/utils/crypto");
const env_config_1 = require("./env.config");
// Config
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
// Routes
app.get("/get", (req, res) => {
    console.log(req.body);
    res.json({
        hello: "world",
    });
});
app.post("/", (req, res) => {
    const id = (0, uuid_1.uuid)();
    res.json({
        id,
        apiKey: env_config_1.config.API_KEY,
        encrypted: (0, crypto_1.decrypt)(req.body.java),
    });
});
// Process
const instance = new tunnel_ssh_1.Tunnel(env_config_1.config.PORT);
const exec = (tunnel) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, port } = yield tunnel.createTunnel();
    console.log(url);
    return {
        url,
        port,
    };
});
exec(instance);
// Server
app.listen(env_config_1.config.PORT);
