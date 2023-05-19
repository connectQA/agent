"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * A method to build unique identifiers.
 * @returns UUID string.
 */
function uuid() {
    return (0, uuid_1.v4)();
}
exports.default = uuid;
