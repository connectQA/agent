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
const tunnel_ssh_1 = require("./src/utils/tunnel-ssh");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/get", (req, res) => {
    console.log(req.body);
    res.json({
        hello: "world",
    });
});
app.post("/", (req, res) => {
    console.log(req.body.java);
    res.json({
        hello: "world",
    });
});
const test = new tunnel_ssh_1.Tunnel(3000);
const exec = () => __awaiter(void 0, void 0, void 0, function* () {
    const tunnel = yield test.createTunnel();
    console.log(tunnel.url);
});
exec();
app.listen(3000);
