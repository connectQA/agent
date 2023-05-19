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
exports.Tunnel = void 0;
const localtunnel_1 = __importDefault(require("localtunnel"));
class Tunnel {
    constructor(port = 3000) {
        this._port = port;
    }
    createTunnel() {
        return __awaiter(this, void 0, void 0, function* () {
            const tunnel = yield (0, localtunnel_1.default)({ port: this._port });
            tunnel.on("request", (info) => {
                console.log(info);
            });
            tunnel.on("error", (err) => {
                console.log(err);
            });
            tunnel.on("close", () => {
                console.warn("Tunnel closed.");
            });
            return tunnel;
        });
    }
}
exports.Tunnel = Tunnel;
